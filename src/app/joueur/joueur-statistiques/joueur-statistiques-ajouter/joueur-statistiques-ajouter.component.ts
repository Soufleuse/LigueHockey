import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { JoueurDto } from 'src/app/services/joueur';
import { JoueurStatistiquesService } from 'src/app/services/joueur-statistiques.service';
import { StatsJoueurDto } from 'src/app/services/joueur-stats';
import { JoueurService } from 'src/app/services/joueur.service';

@Component({
  selector: 'app-joueur-statistiques-ajouter',
  templateUrl: './joueur-statistiques-ajouter.component.html',
  styleUrls: ['./joueur-statistiques-ajouter.component.css'],
  imports: [ReactiveFormsModule]
})
export class JoueurStatistiquesAjouterComponent implements OnInit {

  statsJoueurForm: FormGroup | any;
  statsJoueurData: StatsJoueurDto = new StatsJoueurDto();

  listeJoueur: JoueurDto[] = [];

  constructor(private fb: FormBuilder,
              private joueurService: JoueurService,
              private joueurStatsService: JoueurStatistiquesService) { }

  ngOnInit(): void {
    this.statsJoueurData.joueur = new JoueurDto();

    const monObservable = {
      next: (reponse: JoueurDto[]) => { this.listeJoueur = reponse; },
      error: (err: Error) => { console.log(err); },
      complete: () => { console.log('Lecture terminée'); }
    };

    this.joueurService.obtenirListeJoueur().subscribe(monObservable);

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
    let joueurSelectionne = this.listeJoueur.find(x => x.id == idJoueurSelectionne);

    this.statsJoueurData.joueurId = joueurSelectionne!.id;
    this.statsJoueurData.anneeStats = this.statsJoueurForm.get('anneeStats')!.value;
    this.statsJoueurData.nbPartiesJouees = this.statsJoueurForm.get('nbPartiesJouees')!.value;
    this.statsJoueurData.nbButs = this.statsJoueurForm.get('nbButs')!.value;
    this.statsJoueurData.nbPasses = this.statsJoueurForm.get('nbPasses')!.value;
    this.statsJoueurData.nbMinutesPenalites = this.statsJoueurForm.get('nbMinutesPenalites')!.value;
    this.statsJoueurData.plusseMoins = this.statsJoueurForm.get('plusseMoins')!.value;
    this.statsJoueurData.joueur = joueurSelectionne!;

    const monObservation = {
      next: () => { this.statsJoueurForm.patchValue({messageAAfficher: 'Création effectuée'}); },
      error: (err: Error) => { this.statsJoueurForm.patchValue({messageAAfficher: err}); },
      complete: () => { console.log("Création complétée"); }
    };
    this.joueurStatsService.creerStatsJoueur(this.statsJoueurData).subscribe(monObservation);
  }
}
