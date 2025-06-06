import { HttpHeaders } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { environment } from '../../environments/environment';

export abstract class baseService {

    protected baseUrl = environment.baseUrl;

    protected httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    /**
     * Code de https://angular.io/tutorial/toh-pt6 .
     * Puis j'ai traduit, tsé qu'au Québec, on parle franssa.
     * Gérer les opérations Http qui ont échouées.
     * Laisse l'application continuer.
     * @param operation - nom de l'opération qui a échoué
     * @param result - Valeur optionnelle à retourner comme le résultat observable
     */
     protected handleError<T>(operation = 'opération-au-coude', result?: T) {
       return (error: any): Observable<T> => {
   
       // TODO: send the error to remote logging infrastructure
       console.error(error); // log to console instead
   
       // TODO: better job of transforming error for user consumption
       console.log(`${operation} failed: ${error.message}`);
   
       // Let the app keep running by returning an empty result.
       // Peut-être retourner un objet contenant un message d'erreur.
       return of(result as T);
     };
    }
}