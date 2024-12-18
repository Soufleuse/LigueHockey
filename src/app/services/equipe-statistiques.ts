import { Equipe } from "./equipe";

export class EquipeStatistiques {
    anneeStats: number = 0;
    nbPartiesJouees: number = 0;
    nbVictoires: number = 0;
    nbDefaites: number = 0;
    nbDefProlo: number = 0;
    nbButsPour: number = 0;
    nbButsContre: number = 0;

    equipeId: number = 0;
    equipe: Equipe = new Equipe();
}