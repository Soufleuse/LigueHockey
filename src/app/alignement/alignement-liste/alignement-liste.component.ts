import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { AlignementService } from 'src/app/services/alignement.service';
import { Alignement } from '../../services/alignement';

@Component({
  selector: 'app-alignement-liste',
  templateUrl: './alignement-liste.component.html',
  styleUrls: ['./alignement-liste.component.css']
})
export class AlignementListeComponent implements OnInit {

  data: Alignement[] | undefined = undefined;

  constructor(private alignementService: AlignementService,
              private routeActive: ActivatedRoute,
              private router: Router,
              private maPipePourLesDates: DatePipe) { }

  ngOnInit(): void {
    const noEquipe = this.routeActive.snapshot.paramMap.get('id');
    var noEquipenonNull = noEquipe == null ? 0 : +noEquipe;

    const monObservation = {
      next: (reponse: Alignement[]) => {
        this.data = reponse;
        this.data.forEach(monElement => {
          const allerChercherNom = {
            next: (prenomNom: string) => {
              monElement.prenomNomJoueur = prenomNom;
              monElement.dateDebutAffichee = this.maPipePourLesDates.transform(monElement.dateDebutAvecEquipe, 'yyyy-MM-dd')!;
            },
            error: (errPrenomNom: Error) => { console.log("Erreur à la lecture du nom du joueur : " + errPrenomNom.message); },
            complete: () => console.log("Lecture du nom du joueur effectuée")
          }

          this.alignementService.obtenirPrenomNomJoueur(monElement.joueurId).subscribe(allerChercherNom);
        });
      },
      error: (err: Error) => { console.log('Erreur: ' + err.message); },
      complete: () => console.log("Lecture de l''alignement terminé")
    };
    this.alignementService.obtenirAlignementSelonEquipe(+noEquipenonNull).subscribe(monObservation);
  }

  consulterJoueur(noJoueur: number): void {
    this.router.navigate(['joueur-consulter/' + noJoueur]);
  }
}
