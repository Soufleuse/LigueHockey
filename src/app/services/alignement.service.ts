import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { baseService } from './baseService';
import { Alignement } from './alignement';

@Injectable({
  providedIn: 'root'
})
export class AlignementService extends baseService {

  private alignementUrl = this.baseUrl + 'equipejoueur/';

  constructor(private http: HttpClient) {
    super();
   }

   obtenirAlignementSelonEquipe(noEquipe: number): Observable<Alignement[]> {
     const url = this.alignementUrl + `parequipe/` + noEquipe;
     return this.http.get<Alignement[]>(url, this.httpOptions);
   }

   obtenirAlignementAvecClef(equipeId: number, joueurId: number, dateDebutAvecEquipe: string): Observable<Alignement> {
    const url = this.alignementUrl + 'parclef/' + equipeId + '/' + joueurId + '/' + dateDebutAvecEquipe;
    return this.http.get<Alignement>(url, this.httpOptions);
   }

   obtenirPrenomNomJoueur(idJoueur: number): Observable<string> {
    const url = this.baseUrl + `joueur/obtenirprenomnom/` + idJoueur;
    return this.http.get(url, {responseType: 'text'});
   }

   obtenirNomEquipeVilleHote(idEquipe: number): Observable<string> {
    const url = this.baseUrl + "Equipe/nomequipeville/" + idEquipe;
    return this.http.get(url, {responseType: 'text'});
   }

   mettreAJourAlignement(monAlignement: Alignement): Observable<Alignement> {
    const url = this.alignementUrl + monAlignement.joueurId + '/' + monAlignement.equipeId + '/' + monAlignement.dateDebutAvecEquipe;
    return this.http.put<Alignement>(url, monAlignement, this.httpOptions)
      .pipe(catchError(this.handleError('put', monAlignement)));
   }

   creerAlignement(monAlignement: Alignement): Observable<Alignement> {
    const url = this.alignementUrl;
    return this.http.post<Alignement>(url, monAlignement, this.httpOptions);
   }
}
