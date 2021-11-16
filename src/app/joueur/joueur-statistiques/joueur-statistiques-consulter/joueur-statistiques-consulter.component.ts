import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JoueurStatistiquesService } from 'src/app/services/joueur-statistiques.service';
import { StatsJoueurDto } from 'src/app/services/joueur-stats';

@Component({
  selector: 'app-joueur-statistiques-consulter',
  templateUrl: './joueur-statistiques-consulter.component.html',
  styleUrls: ['./joueur-statistiques-consulter.component.css']
})
export class JoueurStatistiquesConsulterComponent implements OnInit {

  data: StatsJoueurDto;

  constructor(private route: ActivatedRoute,
              private joueurStatsService: JoueurStatistiquesService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      var noJoueur = params['noJoueur'];
      var anneeStats = params['anneeStats'];
      this.joueurStatsService.obtenirStatsJoueur(noJoueur, anneeStats).subscribe((reponse) => {
        this.data = reponse;
      }, err => {
        console.log('Erreur');
      });
    });
  }

}
