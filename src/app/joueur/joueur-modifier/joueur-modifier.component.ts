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
  monJoueur: JoueurDto = new JoueurDto();

  private monNumeroJoueur: number = 0;

  constructor(private fb: FormBuilder,
              private joueurService: JoueurService,
              private routeActive: ActivatedRoute) {
         
        this.joueurForm = this.fb.group({
          prenom: [''],
          nom: [''],
          dateNaissance: [],
          ville_naissance: [''],
          pays_origine: [''],
          messageAAfficher: ['']
        });
   }

  ngOnInit(): void {
    this.monNumeroJoueur = +this.routeActive.snapshot.paramMap.get('id')!;

    if(this.monNumeroJoueur == 0) {
      this.monJoueur.id = 0;
      this.monJoueur.prenom = '';
      this.monJoueur.nom = '';
      this.monJoueur.dateNaissance = new Date();
      this.monJoueur.villeNaissance = '';
      this.monJoueur.paysOrigine = '';
    } else {
      const monObservation = {
        next: (reponse: JoueurDto) => {
          this.monJoueur = reponse;
          this.joueurForm.patchValue(this.monJoueur);
        },
        error: (err: Error) => { this.joueurForm.patchValue({messageAAfficher: err}); }
      };

      this.joueurService.obtenirJoueur(this.monNumeroJoueur).subscribe(monObservation);
    }
  }

  surEnregistrer(): void {
    
    this.monJoueur.prenom = this.joueurForm.get('prenom')!.value;
    this.monJoueur.nom = this.joueurForm.get('nom')!.value;
    this.monJoueur.dateNaissance = this.joueurForm.get('dateNaissance')!.value;
    this.monJoueur.villeNaissance = this.joueurForm.get('villeNaissance')!.value;
    this.monJoueur.paysOrigine = this.joueurForm.get('paysOrigine')!.value;

    const monObservationCreation = {
      next: () => { this.joueurForm.patchValue({messageAAfficher: 'Création effectuée'}); },
      error: (err: Error) => { this.joueurForm.patchValue({messageAAfficher: err}); }
    };

    const monObservationMaj = {
      next: () => { this.joueurForm.patchValue({messageAAfficher: 'Maj effectuée'}); },
      error: (err: Error) => { this.joueurForm.patchValue({messageAAfficher: err}); }
    };

    if(this.monNumeroJoueur == 0) {
      this.joueurService.creerJoueur(this.monJoueur).subscribe(monObservationCreation);
    } else {
      this.joueurService.majJoueur(this.monJoueur).subscribe(monObservationMaj);
    }
  }
}
