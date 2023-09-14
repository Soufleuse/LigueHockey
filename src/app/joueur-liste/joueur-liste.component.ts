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

  data: JoueurDto[] = [];

  ngOnInit(): void {
    const monObservation = {
      next: (reponse: JoueurDto[]) => { this.data = reponse; },
      error: (err: Error) => { console.log('Erreur: ' + err.message); }
    };
    this.joueurService.obtenirListeJoueur().subscribe(monObservation);
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
