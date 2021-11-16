import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { JoueurDto } from 'src/app/services/joueur';
import { JoueurStatistiquesService } from 'src/app/services/joueur-statistiques.service';
import { StatsJoueurDto } from 'src/app/services/joueur-stats';

@Component({
  selector: 'app-joueur-statistiques-modifier',
  templateUrl: './joueur-statistiques-modifier.component.html',
  styleUrls: ['./joueur-statistiques-modifier.component.css']
})
export class JoueurStatistiquesModifierComponent implements OnInit {

  statsJoueurForm: FormGroup;
  data: StatsJoueurDto;

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private joueurStatsService: JoueurStatistiquesService) {

    this.data = new StatsJoueurDto();
    this.data.joueur = new JoueurDto();
                
    this.statsJoueurForm = this.fb.group({
      nbPartiesJouees: [],
      nbButs: [],
      nbPasses: [],
      nbMinutesPenalites: [],
      plusseMoins: [],
      messageAAfficher: ['']
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      var noJoueur = params['noJoueur'];
      var anneeStats = params['anneeStats'];
      this.joueurStatsService.obtenirStatsJoueur(noJoueur, anneeStats).subscribe((reponse) => {
        this.data = reponse;
        this.statsJoueurForm.patchValue(this.data);
      }, err => {
        console.log('Erreur');
      });
    });
  }

  surEnregistrer(): void {
    this.data.nbPartiesJouees = this.statsJoueurForm.get('nbPartiesJouees').value;
    this.data.nbButs = this.statsJoueurForm.get('nbButs').value;
    this.data.nbPasses = this.statsJoueurForm.get('nbPasses').value;
    this.data.nbMinutesPenalites = this.statsJoueurForm.get('nbMinutesPenalites').value;
    this.data.plusseMoins = this.statsJoueurForm.get('plusseMoins').value;

    this.joueurStatsService.majStatsJoueur(this.data).subscribe((reponse) => {
        this.statsJoueurForm.patchValue({messageAAfficher: 'Maj effectuée'});
      }, err => {
        this.statsJoueurForm.patchValue({messageAAfficher: err});
      });
  }

}
