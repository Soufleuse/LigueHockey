import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Alignement } from 'src/app/services/alignement';
import { AlignementService } from 'src/app/services/alignement.service';
import { Equipe } from 'src/app/services/equipe';
import { EquipeService } from 'src/app/services/equipe.service';
import { alignementInfo } from './alignementInfo';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-alignement-modifier',
  templateUrl: './alignement-modifier.component.html',
  styleUrls: ['./alignement-modifier.component.css']
})
export class AlignementModifierComponent implements OnInit {
  
  alignementForm: FormGroup;
  listeEquipe: Equipe[] = [];
  zeAlignement: Alignement = new Alignement();

  constructor(private fb: FormBuilder,
              private alignementService: AlignementService,
              private equipeService: EquipeService,
              private routeActive: ActivatedRoute,
              private maPipePourLesDates: DatePipe) {

    this.alignementForm = this.fb.group({
      prenomNomJoueur: [''],
      equipeActuelle: [''],
      dateFinAvecEquipeActuelle: ['', Validators.required],
      messageAAfficher: ['']
    });
  }

  ngOnInit(): void {
    const monGerantDestrade = {
      next: (reponse: Equipe[]) => { this.listeEquipe = reponse; },
      error: (x: Error) => { console.log("Erreur " + x.message); },
      complete: () => { console.log("Lecture des équipes complétée"); }
    };
    this.equipeService.obtenirListeEquipes().subscribe(monGerantDestrade);

    var monNoAlignement = +this.routeActive.snapshot.paramMap.get('id')!;
    const monFanfaron = {
      next: (reponse: Alignement) => {
        this.zeAlignement = reponse;

        const allerChercherNomEquipe = {
          next: (nomEquipeVille: string) => { this.zeAlignement.nomEquipeVille = nomEquipeVille },
          error: (err: Error) => { console.log("Erreur lecture nom equipe: " + err.message); },
          complete: () => {
            console.log("Lecture du nom de l'équipe terminée");

            const allerChercherNomJoueur = {
              next: (monNom: string) => { this.zeAlignement.prenomNomJoueur = monNom; },
              error: (err: Error) => { console.log("Erreur: " + err.message); },
              complete: () => {
                console.log("Lecture du nom du joueur terminée");
                var mesValeurs = new alignementInfo();
                mesValeurs.prenomNomJoueur = this.zeAlignement.prenomNomJoueur;
                mesValeurs.equipeActuelle = this.zeAlignement.nomEquipeVille;
                this.alignementForm.patchValue(mesValeurs);
              }
            };
            this.alignementService.obtenirPrenomNomJoueur(reponse.joueurId).subscribe(allerChercherNomJoueur);
          }
        };
        this.alignementService.obtenirNomEquipeVilleHote(reponse.equipeId).subscribe(allerChercherNomEquipe);
      },
      error: (err: Error) => { console.log(err.message); },
      complete: () => { console.log("Lecture de l'alignement terminée"); }
    };
    this.alignementService.obtenirAlignementAvecId(monNoAlignement).subscribe(monFanfaron);
  }

  surEnregistrer(): void {
    this.alignementForm.markAllAsTouched();
    if(this.alignementForm.valid) {
      console.log('Les données sont valides pour sauvegarde.');
    }
    else {
      console.log("Il y a des erreurs dans la forme.");
    }
  }
}
