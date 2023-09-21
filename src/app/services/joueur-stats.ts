import { Equipe } from "./equipe";
import { JoueurDto } from "./joueur";

export class StatsJoueurDto {
    anneeStats: number = 0;
    nbPartiesJouees: number = 0;
    nbButs: number = 0;
    nbPasses: number = 0;
    nbPoints: number = 0;
    nbMinutesPenalites: number = 0;
    plusseMoins: number = 0;

    // Partie pour les gardiens
    victoires: number = 0;
    defaites: number = 0;
    nulles: number = 0;
    defaitesEnProlongation: number = 0;
    butsAlloues: number = 0;
    tirsAlloues: number = 0;
    minutesJouees: number = 0;

    joueurId: number = 0;
    joueur: JoueurDto = new JoueurDto();

    equipeId: number = 0;
    equipe: Equipe = new Equipe();
}
