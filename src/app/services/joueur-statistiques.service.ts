import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { baseService } from './baseService';
import { StatsJoueurDto } from './joueur-stats';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class JoueurStatistiquesService extends baseService {
  private statsJoueurUrl = this.baseUrl + 'StatsJoueur/';

  constructor(private http: HttpClient) {
    super();
   }

   obtenirListeStatsJoueur(): Observable<StatsJoueurDto[]> {
    const url = this.statsJoueurUrl + `parannee/` + environment.AnneeStats;
    return this.http.get<StatsJoueurDto[]>(url, this.httpOptions);
   }

   obtenirStatsJoueur(noJoueur: number, anneeStats: number): Observable<StatsJoueurDto> {
     const url = this.statsJoueurUrl + noJoueur + `/` + anneeStats;
     return this.http.get<StatsJoueurDto>(url, this.httpOptions);
   }

   creerStatsJoueur(statsJoueur: StatsJoueurDto): Observable<StatsJoueurDto> {
    return this.http.post<StatsJoueurDto>(this.statsJoueurUrl, statsJoueur, this.httpOptions);
   }

   majStatsJoueur(statsJoueur: StatsJoueurDto): Observable<StatsJoueurDto> {
    const monUrl = this.statsJoueurUrl + statsJoueur.joueurId + `/` + statsJoueur.anneeStats;
    return this.http.put<StatsJoueurDto>(monUrl, statsJoueur, this.httpOptions)
      .pipe(catchError(this.handleError('put', statsJoueur)));
    }
}
