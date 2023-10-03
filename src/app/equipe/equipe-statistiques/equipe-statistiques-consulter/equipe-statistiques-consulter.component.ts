import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EquipeStatistiques } from 'src/app/services/equipe-statistiques';
import { EquipeStatistiquesService } from 'src/app/services/equipe-statistiques.service';

@Component({
  selector: 'app-equipe-statistiques-consulter',
  templateUrl: './equipe-statistiques-consulter.component.html',
  styleUrls: ['./equipe-statistiques-consulter.component.css']
})
export class EquipeStatistiquesConsulterComponent implements OnInit {

  data: EquipeStatistiques | undefined;

  constructor(private route: ActivatedRoute,
              private equipeStatsService: EquipeStatistiquesService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      var equipeId = params['noEquipe'];
      var anneeStats = params['anneeStats'];

      this.equipeStatsService.obtenirStatsEquipe(equipeId, anneeStats).subscribe( {
        next: (reponse: EquipeStatistiques) => { this.data = reponse; },
        error: (err: Error) => { console.log("Erreur: " + err.message); },
        complete: () => { console.log("Lecture terminée"); }
      });
    });
  }
}
