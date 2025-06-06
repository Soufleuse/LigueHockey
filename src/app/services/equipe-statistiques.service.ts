import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { baseService } from './baseService';
import { EquipeStatistiques } from './equipe-statistiques';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EquipeStatistiquesService extends baseService {
  private statsEquipeUrl = this.baseUrl + 'StatsEquipe/';

  constructor(private http: HttpClient) {
    super();
   }
  
  obtenirListeStatsEquipe(): Observable<EquipeStatistiques[]> {
    const url = this.statsEquipeUrl + `parannee/` + environment.AnneeStats;
    return this.http.get<EquipeStatistiques[]>(url, this.httpOptions);
  }

  obtenirStatsEquipe(equipeId: number, anneeStats: number): Observable<EquipeStatistiques> {
    const url = this.statsEquipeUrl + equipeId + `/` + anneeStats;
    return this.http.get<EquipeStatistiques>(url, this.httpOptions);
  }

  majStatsEquipe(statsEquipe: EquipeStatistiques): Observable<EquipeStatistiques> {
    const url = this.statsEquipeUrl + statsEquipe.equipeId + `/` + statsEquipe.anneeStats;
    return this.http.put<EquipeStatistiques>(url, statsEquipe, this.httpOptions)
        .pipe(catchError(this.handleError('put', statsEquipe)));
  }

  creerStatsEquipe(statsEquipe: EquipeStatistiques): Observable<EquipeStatistiques> {
    const url = this.statsEquipeUrl;
    return this.http.post<EquipeStatistiques>(url, statsEquipe, this.httpOptions)
        .pipe(catchError(this.handleError('post', statsEquipe)));
  }
}
