import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { EquipeStatistiques } from 'src/app/services/equipe-statistiques';
import { EquipeStatistiquesService } from 'src/app/services/equipe-statistiques.service';

@Component({
  selector: 'app-equipe-statistiques-modifier',
  templateUrl: './equipe-statistiques-modifier.component.html',
  styleUrls: ['./equipe-statistiques-modifier.component.css'],
  imports: [ReactiveFormsModule]
})
export class EquipeStatistiquesModifierComponent implements OnInit {
  
  data: EquipeStatistiques = new EquipeStatistiques();
  statsEquipeForm: FormGroup;

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private equipeStatsService: EquipeStatistiquesService) {
    
    this.statsEquipeForm = this.fb.group({
      equipeId: [''],
      nbPartiesJouees: ['', Validators.required],
      nbVictoires: ['', Validators.required],
      nbDefaites: ['', Validators.required],
      nbDefProlo: ['', Validators.required],
      nbButsPour: ['', Validators.required],
      nbButsContre: ['', Validators.required],
      messageAAfficher: ['']
    });
  }

  ngOnInit(): void {

    this.route.params.subscribe(params => {
      var equipeId = params['noEquipe'];
      var anneeStats = params['anneeStats'];

      this.equipeStatsService.obtenirStatsEquipe(equipeId, anneeStats).subscribe( {
        next: (reponse: EquipeStatistiques) => {
          this.data = reponse;
          this.statsEquipeForm.patchValue(this.data);
        },
        error: (err: Error) => { console.log("Erreur: " + err.message); },
        complete: () => { console.log("Lecture terminée"); }
      });
    });
  }

  surEnregistrer(): void {
    this.data.nbPartiesJouees = this.statsEquipeForm.get("nbPartiesJouees")!.value;
    this.data.nbVictoires = this.statsEquipeForm.get("nbVictoires")!.value;
    this.data.nbDefaites = this.statsEquipeForm.get("nbDefaites")!.value;
    this.data.nbDefProlo = this.statsEquipeForm.get("nbDefProlo")!.value;
    this.data.nbButsPour = this.statsEquipeForm.get("nbButsPour")!.value;
    this.data.nbButsContre = this.statsEquipeForm.get("nbButsContre")!.value;

    this.equipeStatsService.majStatsEquipe(this.data).subscribe({
      next: (reponse: EquipeStatistiques) => { console.log("Next effectué"); },
      error: (err: Error) => { console.log("Erreur: " + err.message); },
      complete: () => { this.statsEquipeForm.controls['messageAAfficher'].setValue("MAJ complétée"); }
    });
  }
}
