import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { JoueurDto } from 'src/app/services/joueur';
import { JoueurStatistiquesService } from 'src/app/services/joueur-statistiques.service';
import { StatsJoueurDto } from 'src/app/services/joueur-stats';
import { JoueurService } from 'src/app/services/joueur.service';

@Component({
  selector: 'app-joueur-statistiques-ajouter',
  templateUrl: './joueur-statistiques-ajouter.component.html',
  styleUrls: ['./joueur-statistiques-ajouter.component.css']
})
export class JoueurStatistiquesAjouterComponent implements OnInit {

  statsJoueurForm: FormGroup;
  statsJoueurData: StatsJoueurDto;

  listeJoueur: JoueurDto[];

  constructor(private fb: FormBuilder,
              private joueurService: JoueurService,
              private joueurStatsService: JoueurStatistiquesService) { }

  ngOnInit(): void {
    this.statsJoueurData = new StatsJoueurDto();
    this.statsJoueurData.joueur = new JoueurDto();

    this.joueurService.obtenirListeJoueur().subscribe((reponse) => {
      this.listeJoueur = reponse;
    }, err => {
      console.log(err);
    });

    let dateSysteme = new Date();
                
    this.statsJoueurForm = this.fb.group({
      anneeStats: [dateSysteme.getFullYear()],
      nbPartiesJouees: [0],
      nbButs: [0],
      nbPasses: [0],
      nbMinutesPenalites: [0],
      plusseMoins: [0],
      messageAAfficher: ['']
    });
  }

  surEnregistrer(): void {
    let element = <HTMLSelectElement>document.getElementById('selectionJoueur');
    let idJoueurSelectionne = +((element).value);
    let joueurSelectionne = this.listeJoueur.find(x => x.no_Joueur == idJoueurSelectionne);

    this.statsJoueurData.no_JoueurRefId = joueurSelectionne.no_Joueur;
    this.statsJoueurData.anneeStats = this.statsJoueurForm.get('anneeStats').value;
    this.statsJoueurData.nbPartiesJouees = this.statsJoueurForm.get('nbPartiesJouees').value;
    this.statsJoueurData.nbButs = this.statsJoueurForm.get('nbButs').value;
    this.statsJoueurData.nbPasses = this.statsJoueurForm.get('nbPasses').value;
    this.statsJoueurData.nbMinutesPenalites = this.statsJoueurForm.get('nbMinutesPenalites').value;
    this.statsJoueurData.plusseMoins = this.statsJoueurForm.get('plusseMoins').value;
    this.statsJoueurData.joueur = joueurSelectionne;

    this.joueurStatsService.creerStatsJoueur(this.statsJoueurData).subscribe((reponse) => {
        this.statsJoueurForm.patchValue({messageAAfficher: 'Création effectuée'});
      }, err => {
        this.statsJoueurForm.patchValue({messageAAfficher: err});
      });
  }

}
