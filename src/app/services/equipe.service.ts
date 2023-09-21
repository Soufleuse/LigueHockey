import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { baseService } from './baseService';
import { Equipe } from './equipe';

@Injectable({
  providedIn: 'root'
})
export class EquipeService extends baseService {

  private equipeUrl = this.baseUrl + 'Equipe';

  constructor(private http: HttpClient) {
    super();
   }

  obtenirListeEquipes(): Observable<Equipe[]> {
    return this.http.get<Equipe[]>(this.equipeUrl, this.httpOptions);
  }

  obtenirEquipe(noEquipe: number): Observable<Equipe> {
    const monUrl = this.equipeUrl + `/` + noEquipe;
    return this.http.get<Equipe>(monUrl, this.httpOptions);
  }

  creerEquipe(equipe: Equipe): Observable<Equipe> {
    const monUrl = this.equipeUrl;
    return this.http.post<Equipe>(monUrl, equipe, this.httpOptions);
      //.pipe(catchError(this.handleError('post', equipe))); // Voir quoi faire avec la pipe.
  }

  majEquipe(equipe: Equipe): Observable<Equipe> {
    const monUrl = this.equipeUrl + `/` + equipe.id;
    return this.http.put<Equipe>(monUrl, equipe, this.httpOptions)
      .pipe(catchError(this.handleError('put', equipe)));
  }
}
