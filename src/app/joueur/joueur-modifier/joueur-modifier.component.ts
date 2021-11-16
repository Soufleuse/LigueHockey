import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { JoueurDto } from 'src/app/services/joueur';
import { JoueurService } from 'src/app/services/joueur.service';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-joueur-modifier',
  templateUrl: './joueur-modifier.component.html',
  styleUrls: ['./joueur-modifier.component.css']
})
export class JoueurModifierComponent implements OnInit {
  
  joueurForm: FormGroup;
  monJoueur: JoueurDto;

  private monNumeroJoueur: number;

  constructor(private fb: FormBuilder,
              private joueurService: JoueurService,
              private routeActive: ActivatedRoute,
              private datePipe: DatePipe) {
         
        this.joueurForm = this.fb.group({
          prenom: [''],
          nom: [''],
          date_Naissance: [],
          ville_naissance: [''],
          pays_origine: [''],
          messageAAfficher: ['']
        });
   }

  ngOnInit(): void {
    this.monNumeroJoueur = +this.routeActive.snapshot.paramMap.get('id');

    if(this.monNumeroJoueur == 0) {
      this.monJoueur = new JoueurDto();
      this.monJoueur.no_Joueur = 0;
      this.monJoueur.prenom = '';
      this.monJoueur.nom = '';
      this.monJoueur.date_Naissance = new Date();
      this.monJoueur.ville_naissance = '';
      this.monJoueur.pays_origine = '';
    } else {
      this.joueurService.obtenirJoueur(this.monNumeroJoueur).subscribe((reponse) => {
          this.monJoueur = reponse;
          this.joueurForm.patchValue(this.monJoueur);
        }, err => {
          this.joueurForm.patchValue({messageAAfficher: err});
        });
    }
  }

  surEnregistrer(): void {
    
    this.monJoueur.prenom = this.joueurForm.get('prenom').value;
    this.monJoueur.nom = this.joueurForm.get('nom').value;
    this.monJoueur.date_Naissance = this.joueurForm.get('date_Naissance').value;
    this.monJoueur.ville_naissance = this.joueurForm.get('ville_naissance').value;
    this.monJoueur.pays_origine = this.joueurForm.get('pays_origine').value;

    if(this.monNumeroJoueur == 0) {
      this.joueurService.creerJoueur(this.monJoueur).subscribe((reponse) => {
          this.joueurForm.patchValue({messageAAfficher: 'Création effectuée'});
        }, err => {
          this.joueurForm.patchValue({messageAAfficher: err});
      });
    } else {
      this.joueurService.majJoueur(this.monJoueur).subscribe((reponse) => {
          this.joueurForm.patchValue({messageAAfficher: 'Maj effectuée'});
        }, err => {
          this.joueurForm.patchValue({messageAAfficher: err});
        });
    }
  }

}
