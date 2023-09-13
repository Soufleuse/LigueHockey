import { Component, OnInit } from '@angular/core';
import { EquipeService } from "../services/equipe.service";
import { Equipe } from "../services/equipe";
import { Router } from '@angular/router';

@Component({
  selector: 'app-equipe-liste',
  templateUrl: './equipe-liste.component.html',
  styleUrls: ['./equipe-liste.component.css']
})
export class EquipeListeComponent implements OnInit {

  data: Equipe[] = [];

  constructor(private router: Router,
              private equipeService: EquipeService) { }

  ngOnInit(): void {
    const monObservation = {
      next: (reponse: Equipe[]) => { this.data = reponse; },
      error: (err: Error) => { console.log('Erreur: ' + err.message); }
    };
    this.equipeService.obtenirListeEquipes().subscribe(monObservation);
  }

  consulterAlignement(noEquipe: number): void {
    this.router.navigate(['alignement-liste/' + noEquipe]);
  }

  ajouterEquipe(): void {
    this.router.navigate(['equipe-modifier/0']);
  }

  modifierEquipe(noEquipe: number): void {
    this.router.navigate(['equipe-modifier/' + noEquipe]);
  }

  consulterEquipe(noEquipe: number): void {
    this.router.navigate(['equipe-consulter/' + noEquipe]);
  }
}
