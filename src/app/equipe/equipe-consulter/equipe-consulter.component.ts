import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Equipe } from 'src/app/services/equipe';
import { EquipeService } from 'src/app/services/equipe.service';

@Component({
  selector: 'app-equipe-consulter',
  templateUrl: './equipe-consulter.component.html',
  styleUrls: ['./equipe-consulter.component.css']
})
export class EquipeConsulterComponent implements OnInit {

  equipeForm: FormGroup;
  monEquipe: Equipe = new Equipe();

  constructor(private fb: FormBuilder,
              private equipeService: EquipeService,
              private routeActive: ActivatedRoute) {
    
    this.equipeForm = this.fb.group({
      nom_Equipe: [''],
      ville: [''],
      annee_debut: [''],
      annee_fin: [''],
      est_Devenue_Equipe: ['']
    });
   }

  ngOnInit(): void {
    const monNumeroEquipe = this.routeActive.snapshot.paramMap.get('id');

    const monObservation = {
      next: (reponse: Equipe) => {
        this.monEquipe = reponse;
        this.equipeForm.patchValue(this.monEquipe);
      },
      error: (err: Error) => { console.log(err); }
    };
    this.equipeService.obtenirEquipe(+monNumeroEquipe!).subscribe(monObservation);
  }
}
