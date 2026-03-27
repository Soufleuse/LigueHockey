import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { baseService } from './baseService';
import { Calendrier } from './calendrier';

@Injectable({
  providedIn: 'root'
})
export class CalendrierService extends baseService {

  private calendrierUrl = this.baseUrl + 'partie';

  constructor(private http: HttpClient) {
    super();
   }

  obtenirCalendrierSelonDate(datePartieJouee: Date): Observable<Calendrier[]> {
    const monUrl = this.calendrierUrl + `/` + datePartieJouee;
    return this.http.get<Calendrier[]>(this.calendrierUrl, this.httpOptions);
  }

  obtenirCalendrierPourUneEquipe(idEquipe: number, anneeStats: number): Observable<Calendrier[]> {
    const monUrl = this.calendrierUrl + `/listePourUneEquipe/` + idEquipe + `/` + anneeStats;
    return this.http.get<Calendrier[]>(monUrl, this.httpOptions);
  }

  creerPartie(partie: Calendrier): Observable<boolean> {
    const monUrl = this.calendrierUrl;
    return this.http.post<boolean>(monUrl, partie, this.httpOptions);
  }

  majPartie(partie: Calendrier): Observable<Calendrier> {
    const monUrl = this.calendrierUrl + `/` + partie.idPartie;
    return this.http.put<Calendrier>(monUrl, partie, this.httpOptions)
      .pipe(catchError(this.handleError('put', partie)));
  }
}
