import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Equipe } from 'src/app/services/equipe';
import { EquipeService } from 'src/app/services/equipe.service';

@Component({
  selector: 'app-equipe-modifier',
  templateUrl: './equipe-modifier.component.html',
  styleUrls: ['./equipe-modifier.component.css'],
  imports: [ReactiveFormsModule]
})
export class EquipeModifierComponent implements OnInit {

  equipeForm: FormGroup;
  monEquipe: Equipe = new Equipe();
  private monNumeroEquipe: number = 0;

  constructor(private fb: FormBuilder,
              private equipeService: EquipeService,
              private routeActive: ActivatedRoute) {

    this.equipeForm = this.fb.group({
      nomEquipe: ['', Validators.required],
      ville: ['', Validators.required],
      anneeDebut: ['', Validators.required],
      anneeFin: [''],
      estDevenueEquipe: [''],
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
      this.monEquipe.id = 0;
      this.monEquipe.nomEquipe = '';
      this.monEquipe.ville = '';
      this.monEquipe.anneedebut = new Date().getFullYear();
      this.monEquipe.anneefin = null;
      this.monEquipe.estDevenueEquipe = null;

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
    this.monEquipe.nomEquipe = this.equipeForm.get('nomEquipe')!.value;
    this.monEquipe.ville = this.equipeForm.get('ville')!.value;
    this.monEquipe.anneedebut = this.equipeForm.get('anneeDebut')!.value;
    this.monEquipe.anneefin = this.equipeForm.get('anneeFin')!.value;
    this.monEquipe.estDevenueEquipe = this.equipeForm.get('estDevenueEquipe')!.value;

    const monObservationCreation = {
      next: (reponse: Equipe) => {
        this.monNumeroEquipe = reponse.id;
        this.monEquipe.id = reponse.id;
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
