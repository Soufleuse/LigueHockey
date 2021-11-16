import { JoueurDto } from "./joueur";

export class StatsJoueurDto {
    anneeStats: number;
    nbPartiesJouees: number;
    nbButs: number;
    nbPasses: number;
    nbPoints: number;
    nbMinutesPenalites: number;
    plusseMoins: number;

    // Partie pour les gardiens
    victoires: number;
    defaites: number;
    nulles: number;
    defaitesEnProlongation: number;
    butsAlloues: number;
    tirsAlloues: number;
    minutesJouees: number;

    no_JoueurRefId : number;
    joueur: JoueurDto;
}