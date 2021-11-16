import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { baseService } from './baseService';
import { Alignement } from './alignement';

@Injectable({
  providedIn: 'root'
})
export class AlignementService extends baseService {

  private alignementUrl = this.baseUrl + 'equipe_joueurBds';

  constructor(private http: HttpClient) {
    super();
   }

   obtenirAlignementSelonEquipe(noEquipe: number): Observable<Alignement[]> {
     const url = this.alignementUrl + `/` + noEquipe;
     return this.http.get<Alignement[]>(url, this.httpOptions);
   }
}
