import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { EquipeListeComponent } from './equipe-liste/equipe-liste.component';
import { EquipeModifierComponent } from './equipe/equipe-modifier/equipe-modifier.component';
import { EquipeConsulterComponent } from './equipe/equipe-consulter/equipe-consulter.component';
import { JoueurListeComponent } from './joueur-liste/joueur-liste.component';
import { JoueurConsulterComponent } from './joueur/joueur-consulter/joueur-consulter.component';
import { JoueurModifierComponent } from './joueur/joueur-modifier/joueur-modifier.component';

import { registerLocaleData, DatePipe, CommonModule } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { JoueurStatistiquesConsulterComponent } from './joueur/joueur-statistiques/joueur-statistiques-consulter/joueur-statistiques-consulter.component';
import { JoueurStatistiquesModifierComponent } from './joueur/joueur-statistiques/joueur-statistiques-modifier/joueur-statistiques-modifier.component';
import { JoueurStatistiquesListeComponent } from './joueur/joueur-statistiques/joueur-statistiques-liste/joueur-statistiques-liste.component';
import { JoueurStatistiquesAjouterComponent } from './joueur/joueur-statistiques/joueur-statistiques-ajouter/joueur-statistiques-ajouter.component';
import { EquipeStatistiquesListeComponent } from './equipe/equipe-statistiques/equipe-statistiques-liste/equipe-statistiques-liste.component';
import { EquipeStatistiquesConsulterComponent } from './equipe/equipe-statistiques/equipe-statistiques-consulter/equipe-statistiques-consulter.component';
import { AlignementListeComponent } from './alignement/alignement-liste/alignement-liste.component';
import { AlignementModifierComponent } from './alignement/alignement-modifier/alignement-modifier.component';
import { EquipeStatistiquesAjouterComponent } from './equipe/equipe-statistiques/equipe-statistiques-ajouter/equipe-statistiques-ajouter.component';
import { EquipeStatistiquesModifierComponent } from './equipe/equipe-statistiques/equipe-statistiques-modifier/equipe-statistiques-modifier.component';
registerLocaleData(localeFr);

@NgModule({ imports: [
        CommonModule,
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forRoot([
            { path: 'equipe-liste', component: EquipeListeComponent },
            { path: 'equipe-consulter/:id', component: EquipeConsulterComponent },
            { path: 'equipe-modifier/:id', component: EquipeModifierComponent },
            { path: 'equipe-statistiques-liste', component: EquipeStatistiquesListeComponent },
            { path: 'equipe-statistiques-consulter/:noEquipe/:anneeStats', component: EquipeStatistiquesConsulterComponent },
            { path: 'equipe-statistiques-modifier/:noEquipe/:anneeStats', component: EquipeStatistiquesModifierComponent },
            { path: 'equipe-statistiques-ajouter', component: EquipeStatistiquesAjouterComponent },
            { path: 'joueur-liste', component: JoueurListeComponent },
            { path: 'joueur-consulter/:id', component: JoueurConsulterComponent },
            { path: 'joueur-modifier/:id', component: JoueurModifierComponent },
            { path: 'alignement-liste/:id', component: AlignementListeComponent },
            { path: 'alignement-modifier/:equipeId/:joueurId/:dateDebutAvecEquipe', component: AlignementModifierComponent },
            { path: 'joueur-statistiques-liste', component: JoueurStatistiquesListeComponent },
            { path: 'joueur-statistiques-consulter/:noJoueur/:anneeStats', component: JoueurStatistiquesConsulterComponent },
            { path: 'joueur-statistiques-modifier/:noJoueur/:anneeStats', component: JoueurStatistiquesModifierComponent },
            { path: 'joueur-statistiques-ajouter', component: JoueurStatistiquesAjouterComponent }
        ])],
    //bootstrap: [AppComponent],
    providers: [DatePipe, provideHttpClient(withInterceptorsFromDi())] })

    export class AppModule { }
