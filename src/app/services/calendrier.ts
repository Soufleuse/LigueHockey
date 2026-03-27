export interface Calendrier {
    idPartie: number;
    datePartieJouee: Date;
    anneeStats: number;
    nbreButsComptesParHote: number;
    nbreButsComptesParVisiteur: number;
    aFiniEnProlongation: boolean;
    aFiniEnTirDeBarrage: boolean;
    estUnePartieDeSerie: boolean;
    estUnePartieDePresaison: boolean;
    estUnePartieSaisonReguliere: boolean;
    sommairePartie: string;
    idEquipeHote: number;
    idEquipeVisiteuse: number;
}