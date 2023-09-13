import { Component, OnInit } from '@angular/core';
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
              private router: Router) { }

  ngOnInit(): void {
    const noEquipe = this.routeActive.snapshot.paramMap.get('id');
    var noEquipenonNull = noEquipe == null ? 0 : +noEquipe;

    const monObservation = {
      next: (reponse: Alignement[]) => { this.data = reponse; },
      error: (err: Error) => { console.log('Erreur: ' + err.message); },
      complete: () => console.log("Lecture de l''alignement terminé")
    };
    this.alignementService.obtenirAlignementSelonEquipe(+noEquipenonNull).subscribe(monObservation);
  }

  consulterJoueur(noJoueur: number): void {
    this.router.navigate(['joueur-consulter/' + noJoueur]);
  }

}
