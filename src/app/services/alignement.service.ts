import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
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

   obtenirAlignementAvecId(id: number): Observable<Alignement> {
    const url = this.alignementUrl + id;
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
}
