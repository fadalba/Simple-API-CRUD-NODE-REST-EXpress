class Utilisateur {  // on cré un model pour l'ossature d'un utilisateur
  constructor(prenom, nom, email) {
    this.prenom = prenom;
    this.nom = nom;
    this.email = email;
  }
}

module.exports = { Utilisateur };
