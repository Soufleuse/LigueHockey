import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Alignement } from 'src/app/services/alignement';
import { AlignementService } from 'src/app/services/alignement.service';
import { Equipe } from 'src/app/services/equipe';
import { EquipeService } from 'src/app/services/equipe.service';
import { alignementInfo } from './alignementInfo';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-alignement-modifier',
  templateUrl: './alignement-modifier.component.html',
  styleUrls: ['./alignement-modifier.component.css'],
  imports: [ReactiveFormsModule]
})
export class AlignementModifierComponent implements OnInit {
  
  alignementForm: FormGroup;
  listeEquipe: Equipe[] = [];
  zeAlignement: Alignement = new Alignement();

  constructor(private fb: FormBuilder,
              private alignementService: AlignementService,
              private equipeService: EquipeService,
              private routeActive: ActivatedRoute) {

    this.alignementForm = this.fb.group({
      prenomNomJoueur: [''],
      equipeActuelle: [''],
      dateFinAvecEquipeActuelle: [formatDate(new Date(), "yyyy-MM-dd", "en"), Validators.required],
      messageAAfficher: ['']
    });
  }

  ngOnInit(): void {
    const monGerantDestrade = {
      next: (reponse: Equipe[]) => {
        const equipeVide = new Equipe();
        equipeVide.nomEquipe = "<Aucune nouvelle équipe>";
        this.listeEquipe = this.listeEquipe.concat(equipeVide, reponse);
      },
      error: (x: Error) => { console.log("Erreur " + x.message); },
      complete: () => { console.log("Lecture des équipes complétée"); }
    };
    this.equipeService.obtenirListeEquipes().subscribe(monGerantDestrade);

    var monEquipeId = +this.routeActive.snapshot.paramMap.get('equipeId')!;
    var monJoueurId = +this.routeActive.snapshot.paramMap.get('joueurId')!;
    var maDateDebutAvecEquipe = this.routeActive.snapshot.paramMap.get('dateDebutAvecEquipe')!;

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
                this.alignementForm.controls["dateFinAvecEquipeActuelle"].setValue(null);
                if(this.zeAlignement.dateFinAvecEquipe != null) {
                  this.alignementForm.controls["dateFinAvecEquipeActuelle"].setValue(formatDate(this.zeAlignement.dateFinAvecEquipe!, "yyyy-MM-dd", "en"));
                }
              }
            };
            this.alignementService.obtenirPrenomNomJoueur(monJoueurId).subscribe(allerChercherNomJoueur);
          }
        };
        this.alignementService.obtenirNomEquipeVilleHote(monEquipeId).subscribe(allerChercherNomEquipe);
      },
      error: (err: Error) => { console.log(err.message); },
      complete: () => { console.log("Lecture de l'alignement terminée"); }
    };
    this.alignementService.obtenirAlignementAvecClef(monEquipeId, monJoueurId, maDateDebutAvecEquipe).subscribe(monFanfaron);
  }

  surEnregistrer(): void {
    this.alignementForm.markAllAsTouched();
    if(this.alignementForm.valid) {
      console.log('Les données sont valides pour sauvegarde.');
      var monTest = this.alignementForm.get("dateFinAvecEquipeActuelle")?.getRawValue() + '';
      var annee = +monTest.substring(0,4);
      var mois = +monTest.substring(5,7);
      var jour = +monTest.substring(8,10);
      this.zeAlignement.dateFinAvecEquipe = new Date(annee, mois, jour, 0, 0, 0, 0);
      const monObservable = {
        next: (reponse: Alignement) => { },
        error: (err: Error) => { console.log("Erreur " + err.message); },
        complete: () => {
          var mesValeurs = new alignementInfo();
          
          let element = <HTMLSelectElement>document.getElementById('selectionEquipe');
          let idEquipeSelectionne = +((element).value);
          
          if(idEquipeSelectionne == 0) {
            mesValeurs.prenomNomJoueur = this.zeAlignement.prenomNomJoueur;
            mesValeurs.equipeActuelle = this.zeAlignement.nomEquipeVille;
            mesValeurs.messageAAfficher = "MAJ effectuée";
            this.alignementForm.patchValue(mesValeurs);
            this.alignementForm.controls["dateFinAvecEquipeActuelle"].setValue(formatDate(this.zeAlignement.dateFinAvecEquipe!, "yyyy-MM-dd", "en"));
          } else {
            let equipeSelectionne = this.listeEquipe.find(x => x.id == idEquipeSelectionne);
            this.zeAlignement.joueurId = this.zeAlignement.joueurId;
            this.zeAlignement.equipeId = equipeSelectionne!.id;
            this.zeAlignement.nomEquipeVille = equipeSelectionne?.nomEquipe + ' ' + equipeSelectionne?.ville;
            this.zeAlignement.dateDebutAvecEquipe = new Date(annee, mois, jour, 0, 0, 0, 0);
            this.zeAlignement.dateFinAvecEquipe = undefined;
          
            const monFouineux = {
              next: (reponse: Alignement) => { },
              error: (err: Error) => { console.log("Erreur : " + err.message) },
              complete: () => {
                mesValeurs.prenomNomJoueur = this.zeAlignement.prenomNomJoueur;
                mesValeurs.equipeActuelle = this.zeAlignement.nomEquipeVille;
                element.selectedIndex = 0;
                mesValeurs.dateFinAvecEquipeActuelle = undefined;
                mesValeurs.messageAAfficher = "MAJ effectuée";
                this.alignementForm.patchValue(mesValeurs);
              }
            };
            this.alignementService.creerAlignement(this.zeAlignement).subscribe(monFouineux);
          }
        }
      };
      this.alignementService.mettreAJourAlignement(this.zeAlignement).subscribe(monObservable);
    }
    else {
      console.log("Il y a des erreurs dans la forme.");
    }
  }
}
