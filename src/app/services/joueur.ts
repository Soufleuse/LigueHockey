export class JoueurDto {
    no_Joueur: number;
    prenom: string;
    nom: string;
    date_Naissance: Date;
    ville_naissance: string;
    pays_origine: string;
}

export class JoueurAffichage {
    no_joueur: number;
    prenomNom: string;
    date_naissance: string;
    ville_naissance: string;
    pays_origine: string;

    static From(o: JoueurDto): JoueurAffichage {
        var retour = new JoueurAffichage();

        retour.no_joueur = o.no_Joueur;
        retour.prenomNom = o.prenom + ' ' + o.nom;
        retour.date_naissance = o.date_Naissance.toString();
        retour.ville_naissance = o.ville_naissance;
        retour.pays_origine = o.pays_origine;

        return retour;
    }
}
