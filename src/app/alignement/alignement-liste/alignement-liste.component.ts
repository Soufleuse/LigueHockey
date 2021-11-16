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

  data: Alignement[];

  constructor(private alignementServce: AlignementService,
              private routeActive: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    const noEquipe = this.routeActive.snapshot.paramMap.get('id');
    this.alignementServce.obtenirAlignementSelonEquipe(+noEquipe).subscribe((reponse) => {
      this.data = reponse;
    }, err => {
      console.log('Erreur');
    });
  }

  consulterJoueur(noJoueur: number): void {
    this.router.navigate(['joueur-consulter/' + noJoueur]);
  }

}
