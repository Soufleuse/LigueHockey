import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Directive, Input, APP_INITIALIZER } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { EquipeListeComponent } from './equipe-liste/equipe-liste.component';
import { EquipeModifierComponent } from './equipe/equipe-modifier/equipe-modifier.component';
import { EquipeConsulterComponent } from './equipe/equipe-consulter/equipe-consulter.component';
import { JoueurListeComponent } from './joueur-liste/joueur-liste.component';
import { JoueurConsulterComponent } from './joueur/joueur-consulter/joueur-consulter.component';
import { JoueurModifierComponent } from './joueur/joueur-modifier/joueur-modifier.component';

import { registerLocaleData, DatePipe } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { AlignementListeComponent } from './alignement/alignement-liste/alignement-liste.component';
import { JoueurStatistiquesConsulterComponent } from './joueur/joueur-statistiques/joueur-statistiques-consulter/joueur-statistiques-consulter.component';
import { JoueurStatistiquesModifierComponent } from './joueur/joueur-statistiques/joueur-statistiques-modifier/joueur-statistiques-modifier.component';
import { JoueurStatistiquesListeComponent } from './joueur/joueur-statistiques/joueur-statistiques-liste/joueur-statistiques-liste.component';
import { JoueurStatistiquesAjouterComponent } from './joueur/joueur-statistiques/joueur-statistiques-ajouter/joueur-statistiques-ajouter.component';
registerLocaleData(localeFr);

@NgModule({
  declarations: [
    AppComponent,
    EquipeListeComponent,
    EquipeModifierComponent,
    EquipeConsulterComponent,
    JoueurListeComponent,
    JoueurConsulterComponent,
    JoueurModifierComponent,
    AlignementListeComponent,
    JoueurStatistiquesConsulterComponent,
    JoueurStatistiquesModifierComponent,
    JoueurStatistiquesListeComponent,
    JoueurStatistiquesAjouterComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: 'equipe-liste', component: EquipeListeComponent },
      { path: 'equipe-consulter/:id', component: EquipeConsulterComponent },
      { path: 'equipe-modifier/:id', component: EquipeModifierComponent },
      { path: 'joueur-liste', component: JoueurListeComponent },
      { path: 'joueur-consulter/:id', component: JoueurConsulterComponent },
      { path: 'joueur-modifier/:id', component: JoueurModifierComponent },
      { path: 'alignement-liste/:id', component: AlignementListeComponent },
      { path: 'joueur-statistiques-liste', component: JoueurStatistiquesListeComponent },
      { path: 'joueur-statistiques-consulter/:noJoueur/:anneeStats', component: JoueurStatistiquesConsulterComponent },
      { path: 'joueur-statistiques-modifier/:noJoueur/:anneeStats', component: JoueurStatistiquesModifierComponent },
      { path: 'joueur-statistiques-ajouter', component: JoueurStatistiquesAjouterComponent }
    ])
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
