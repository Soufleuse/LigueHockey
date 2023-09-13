import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Equipe } from 'src/app/services/equipe';
import { EquipeService } from 'src/app/services/equipe.service';

@Component({
  selector: 'app-equipe-modifier',
  templateUrl: './equipe-modifier.component.html',
  styleUrls: ['./equipe-modifier.component.css']
})
export class EquipeModifierComponent implements OnInit {

  equipeForm: FormGroup;
  monEquipe: Equipe = new Equipe() /*| undefined = undefined*/;
  private monNumeroEquipe: number = 0;

  constructor(private fb: FormBuilder,
              private equipeService: EquipeService,
              private routeActive: ActivatedRoute) {

    this.equipeForm = this.fb.group({
      nom_Equipe: ['', Validators.required],
      ville: ['', Validators.required],
      annee_debut: ['', Validators.required],
      annee_fin: [''],
      est_Devenue_Equipe: [''],
      messageAAfficher: ['']
    });
   }

  ngOnInit(): void {
    var monNoEquipe = this.routeActive.snapshot.paramMap.get('id');
    if (monNoEquipe != null)
      this.monNumeroEquipe = +monNoEquipe;

    // Va lire l'équipe à modifier si on a un numéro d'équipe; autrement, tombe en création.
    if(this.monNumeroEquipe == undefined || this.monNumeroEquipe == 0) {
      this.monEquipe = new Equipe();
      this.monEquipe.no_Equipe = 0;
      this.monEquipe.nom_Equipe = '';
      this.monEquipe.ville = '';
      this.monEquipe.annee_debut = new Date().getFullYear();
      this.monEquipe.annee_fin = null;
      this.monEquipe.est_Devenue_Equipe = null;

      this.equipeForm.patchValue(this.monEquipe);
    } else {
      const monObservation = {
        next: (reponse: Equipe) => {
          this.monEquipe = reponse;
          this.equipeForm.patchValue(this.monEquipe);
          },
          error: (err:Error) => { this.equipeForm.patchValue({messageAAfficher: err}); }
      };
      this.equipeService.obtenirEquipe(this.monNumeroEquipe).subscribe(monObservation);
    }
  }

  surEnregistrer(): void {
    this.monEquipe.nom_Equipe = this.equipeForm.get('nom_Equipe')!.value;
    this.monEquipe.ville = this.equipeForm.get('ville')!.value;
    this.monEquipe.annee_debut = this.equipeForm.get('annee_debut')!.value;
    this.monEquipe.annee_fin = this.equipeForm.get('annee_fin')!.value;
    this.monEquipe.est_Devenue_Equipe = this.equipeForm.get('est_Devenue_Equipe')!.value;

    const monObservationCreation = {
      next: (reponse: Equipe) => {
        this.monNumeroEquipe = reponse.no_Equipe;
        this.monEquipe.no_Equipe = reponse.no_Equipe;
        this.equipeForm.patchValue({messageAAfficher: 'Création effectuée'});
      },
      error: (err: Error) => { this.equipeForm.patchValue({messageAAfficher: err.message }); }
    };

    const monObservationMaj = {
      next: () => { this.equipeForm.patchValue({messageAAfficher: 'Maj effectuée'}); },
      error: (err: Error) => { this.equipeForm.patchValue({messageAAfficher: err}); }
    };

    if(this.monNumeroEquipe == undefined || this.monNumeroEquipe == 0) {
      this.equipeService.creerEquipe(this.monEquipe).subscribe(monObservationCreation);
    } else {
      this.equipeService.majEquipe(this.monEquipe).subscribe(monObservationMaj);
    }
  }
}
