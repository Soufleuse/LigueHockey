export class JoueurDto {
    id: number = 0;
    prenom: string = "";
    nom: string = "";
    dateNaissance: Date = new Date();
    villeNaissance: string = "";
    paysOrigine: string = "";
}

export class JoueurAffichage {
    id: number = 0;
    prenomNom: string = "";
    dateNaissance: string = "";
    villeNaissance: string = "";
    paysOrigine: string = "";

    static From(o: JoueurDto): JoueurAffichage {
        var retour = new JoueurAffichage();

        retour.id = o.id;
        retour.prenomNom = o.prenom + ' ' + o.nom;
        retour.dateNaissance = o.dateNaissance.toString();
        retour.villeNaissance = o.villeNaissance;
        retour.paysOrigine = o.paysOrigine;

        return retour;
    }
}

