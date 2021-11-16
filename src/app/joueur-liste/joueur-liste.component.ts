import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JoueurDto } from '../services/joueur';
import { JoueurService } from '../services/joueur.service';

@Component({
  selector: 'app-joueur-liste',
  templateUrl: './joueur-liste.component.html',
  styleUrls: ['./joueur-liste.component.css']
})
export class JoueurListeComponent implements OnInit {

  constructor(private router: Router,
              private joueurService: JoueurService) { }

  data: JoueurDto[];

  ngOnInit(): void {
    this.joueurService.obtenirListeJoueur().subscribe((reponse) => {
      this.data = reponse;
    }, err => {
      console.log('Erreur');
    });
  }

  ajouterJoueur(): void {
    this.router.navigate(['joueur-modifier/0']);
  }

  modifierJoueur(noJoueur: number): void {
    this.router.navigate(['joueur-modifier/' + noJoueur]);
  }

  consulterJoueur(noJoueur: number): void {
    this.router.navigate(['joueur-consulter/' + noJoueur]);
  }

}
