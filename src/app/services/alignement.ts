export class Alignement {
    id: number = 0;
    equipeId: number = 0;
    joueurId: number = 0;
    noDossard: number = 0;
    dateDebutAvecEquipe: Date = new Date();
    dateFinAvecEquipe: Date | undefined = undefined;

    prenomNomJoueur: string = "";
    nomEquipeVille: string = "";
    dateDebutAffichee: string = "";
}