export class Alignement {
    equipeId: number = 0;
    joueurId: number = 0;
    dateDebutAvecEquipe: Date = new Date();
    dateFinAvecEquipe: Date | undefined = undefined;
    noDossard: number = 0;

    prenomNomJoueur: string = "";
    nomEquipeVille: string = "";
    dateDebutAffichee: string = "";
}