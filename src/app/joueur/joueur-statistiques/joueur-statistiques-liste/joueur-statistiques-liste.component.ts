import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JoueurStatistiquesService } from 'src/app/services/joueur-statistiques.service';
import { StatsJoueurDto } from '../../../services/joueur-stats';

@Component({
  selector: 'app-joueur-statistiques-liste',
  templateUrl: './joueur-statistiques-liste.component.html',
  styleUrls: ['./joueur-statistiques-liste.component.css']
})
export class JoueurStatistiquesListeComponent implements OnInit {

  data: StatsJoueurDto[] = [];

  constructor(private router: Router,
              private joueurStatsService: JoueurStatistiquesService) { }

  ngOnInit(): void {
    const monObservation = {
      next: (reponse: StatsJoueurDto[]) => { this.data = reponse; },
      error: (err: Error) => { console.log('Erreur: ' + err.message); },
      complete: () => { console.log("Lecture réussie"); }
    };
    this.joueurStatsService.obtenirListeStatsJoueur().subscribe(monObservation);
  }

  consulterStatistiquesJoueur(no_joueur: number, annee_stats: number): void {
    this.router.navigate(['joueur-statistiques-consulter/' + no_joueur + '/' + annee_stats]);
  }

  modifierStatistiquesJoueur(no_joueur: number, annee_stats: number): void {
    this.router.navigate(['joueur-statistiques-modifier/' + no_joueur + '/' + annee_stats]);
  }

  ajouterStatsJoueur(): void {
    this.router.navigate(['joueur-statistiques-ajouter']);
  }
}
