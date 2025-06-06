import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { EquipeStatistiques } from 'src/app/services/equipe-statistiques';
import { Equipe } from 'src/app/services/equipe';
import { EquipeService } from 'src/app/services/equipe.service';
import { EquipeStatistiquesService } from 'src/app/services/equipe-statistiques.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-equipe-statistiques-ajouter',
  templateUrl: './equipe-statistiques-ajouter.component.html',
  styleUrls: ['./equipe-statistiques-ajouter.component.css'],
  imports: [ReactiveFormsModule, CommonModule]
})
export class EquipeStatistiquesAjouterComponent implements OnInit {

  statsEquipeForm: FormGroup | any;
  statsEquipeData: EquipeStatistiques = new EquipeStatistiques();

  listeEquipe: Equipe[] = [];

  constructor(private fb: FormBuilder,
              private equipeService: EquipeService,
              private equipeStatsService: EquipeStatistiquesService) { }

  ngOnInit(): void {
    this.statsEquipeData.equipe = new Equipe();

        const monObservable = {
          next: (reponse: Equipe[]) => { this.listeEquipe = reponse; },
          error: (err: Error) => { console.log(err); },
          complete: () => { console.log('Lecture terminée'); }
        };
    
        this.equipeService.obtenirListeEquipes().subscribe(monObservable);

        let dateSysteme = new Date();

        this.statsEquipeForm = this.fb.group({
          anneeStats: [dateSysteme.getFullYear()],
          nbPartiesJouees: [0],
          nbVictoires: [0],
          nbDefReg: [0],
          nbDefProlo: [0],
          nbButsPour: [0],
          nbButsContre: [0],
          messageAAfficher: ['']
        });
  }

  surEnregistrer(): void {
    let element = <HTMLSelectElement>document.getElementById('selectionEquipe');
    let idEquipeSelectionne = +((element).value);
    let equipeSelectionnee = this.listeEquipe.find(x => x.id == idEquipeSelectionne);

    this.statsEquipeData.equipeId = equipeSelectionnee!.id;
    this.statsEquipeData.anneeStats = this.statsEquipeForm.get('anneeStats')!.value;
    this.statsEquipeData.nbPartiesJouees = this.statsEquipeForm.get('nbPartiesJouees')!.value;
    this.statsEquipeData.nbVictoires = this.statsEquipeForm.get('nbVictoires')!.value;
    this.statsEquipeData.nbDefaites = this.statsEquipeForm.get('nbDefReg')!.value;
    this.statsEquipeData.nbDefProlo = this.statsEquipeForm.get('nbDefProlo')!.value;
    this.statsEquipeData.nbButsPour = this.statsEquipeForm.get('nbButsPour')!.value;
    this.statsEquipeData.nbButsContre = this.statsEquipeForm.get('nbButsContre')!.value;
    this.statsEquipeData.equipe = equipeSelectionnee!;

    const monObservation = {
      next: () => { this.statsEquipeForm.patchValue({messageAAfficher: 'Création effectuée'}); },
      error: (err: Error) => { this.statsEquipeForm.patchValue({messageAAfficher: err}); },
      complete: () => { console.log("Création complétée"); }
    };
    this.equipeStatsService.creerStatsEquipe(this.statsEquipeData).subscribe(monObservation);
  }
}
