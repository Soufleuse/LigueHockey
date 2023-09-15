import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { baseService } from './baseService';
import { JoueurDto } from './joueur';

@Injectable({
  providedIn: 'root'
})
export class JoueurService extends baseService {

  private joueurUrl = this.baseUrl + 'Joueur';

  constructor(private http: HttpClient) {
    super();
   }

   obtenirListeJoueur(): Observable<JoueurDto[]> {
    return this.http.get<JoueurDto[]>(this.joueurUrl, this.httpOptions);
   }

  obtenirJoueur(noJoueur: number): Observable<JoueurDto> {
    const monUrl = this.joueurUrl + `/` + noJoueur;
    return this.http.get<JoueurDto>(monUrl, this.httpOptions);
  }

  creerJoueur(joueur: JoueurDto): Observable<JoueurDto> {
    const monUrl = this.joueurUrl;
    return this.http.post<JoueurDto>(monUrl, joueur, this.httpOptions);
  }

  majJoueur(joueur: JoueurDto): Observable<JoueurDto> {
    const monUrl = this.joueurUrl + `/` + joueur.no_Joueur;
    return this.http.put<JoueurDto>(monUrl, joueur, this.httpOptions)
      .pipe(catchError(this.handleError('put', joueur)));

  }
}
