import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EquipeStatistiques } from 'src/app/services/equipe-statistiques';
import { EquipeStatistiquesService } from 'src/app/services/equipe-statistiques.service';

@Component({
  selector: 'app-equipe-statistiques-liste',
  templateUrl: './equipe-statistiques-liste.component.html',
  styleUrls: ['./equipe-statistiques-liste.component.css'],
  imports: [CommonModule]
})
export class EquipeStatistiquesListeComponent implements OnInit {

  data: EquipeStatistiques[] = [];
  
  constructor(private router: Router,
              private equipeStatsService: EquipeStatistiquesService) { }

  ngOnInit(): void {
    const monObservation = {
      next: (reponse: EquipeStatistiques[]) => { this.data = reponse; },
      error: (err: Error) => { console.log("Erreur: " + err.message); },
      complete: () => { console.log("Lecture complétée"); }
    };
    this.equipeStatsService.obtenirListeStatsEquipe().subscribe(monObservation);
  }

  ajouterStatsEquipe(): void {
    this.router.navigate(['equipe-statistiques-ajouter']);
  }

  modifierStatsEquipe(noEquipe: number, anneeStats: number): void {
    this.router.navigate(['equipe-statistiques-modifier/' + noEquipe + "/" + anneeStats]);
  }

  consulterStatsEquipe(noEquipe: number, anneeStats: number): void {
    this.router.navigate(['equipe-statistiques-consulter/' + noEquipe + "/" + anneeStats]);
  }
}
