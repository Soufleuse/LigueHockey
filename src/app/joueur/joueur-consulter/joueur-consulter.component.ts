import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { JoueurDto, JoueurAffichage } from 'src/app/services/joueur';
import { JoueurService } from 'src/app/services/joueur.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-joueur-consulter',
  templateUrl: './joueur-consulter.component.html',
  styleUrls: ['./joueur-consulter.component.css']
})
export class JoueurConsulterComponent implements OnInit {

  joueurForm: FormGroup;
  monJoueur: JoueurDto;
  monJoueurAffichage: JoueurAffichage;

  constructor(private fb: FormBuilder,
              private joueurService: JoueurService,
              private routeActive: ActivatedRoute,
              private monRouteur: Router) {
      
    this.joueurForm = this.fb.group({
      prenomNom: [''],
      date_naissance: [''],
      ville_naissance: [''],
      pays_origine: ['']
    });
     }

  ngOnInit(): void {
    const monNumeroJoueur = this.routeActive.snapshot.paramMap.get('id');
    this.joueurService.obtenirJoueur(+monNumeroJoueur).subscribe((reponse) => {
        this.monJoueur = reponse;
        this.monJoueurAffichage = JoueurAffichage.From(this.monJoueur);
        this.monJoueurAffichage.date_naissance =
            formatDate(this.monJoueurAffichage.date_naissance, 'shortDate', 'fr-ca');
        this.joueurForm.patchValue(this.monJoueurAffichage);
      }, err => {
        console.log(err);
      });
  }

}
