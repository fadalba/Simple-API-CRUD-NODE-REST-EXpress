const { ObjectID } = require("bson");
const client = require("../db/connect");
const { Utilisateur } = require("../models/utilisateur");

const ajouterUtilisateur = async (req, res) => { // ajout user
  try {
    let utilisateur = new Utilisateur( 
      req.body.prenom,
      req.body.nom,
      req.body.email
    );
    let result = await client
      .db()
      .collection("utilisateur")
      .insertOne(utilisateur);

    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(501).json(error);
  }
};

const getUtilisateurs = async (req, res) => { // afficher tous les utilisateurs
  try {
    let cursor = client
      .db()
      .collection("utilisateur")
      .find()
      .sort({ prenom: 1 });
    let result = await cursor.toArray();
    if (result.length > 0) {
      res.status(200).json(result);
    } else {
      res.status(204).json({ msg: "Aucun utilisateur trouvé" });
    }
  } catch (error) {
    console.log(error);
    res.status(501).json(error);
  }
};

const getUtilisateur = async (req, res) => { // rechercher un utilisateur par son id
  try {
    let id = new ObjectID(req.params.id);
    let cursor = client.db().collection("utilisateur").find({ _id: id });
    let result = await cursor.toArray();
    if (result.length > 0) {
      res.status(200).json(result[0]); //status 200 indique que la requete Http est ok
    } else {
      res.status(204).json({ msg: "Cet utilisateur n'existe pas" }); //status 204 indique que la requete Http est ok mais 
    }                                                                // que le client a besoin de revoir ses informations
  } catch (error) {
    console.log(error);
    res.status(501).json(error); // Le code d'état 501 indique que le serveur ne prend pas en charge la fonctionnalité 
  }                              // nécessaire pour répondre à la requête
};

const updateUtilisateur = async (req, res) => { // modification user  
  try {
    let id = new ObjectID(req.params.id);
    let prenom = req.body.prenom;
    let nom = req.body.nom;
    let email = req.body.email;
    let result = await client
      .db()
      .collection("utilisateur")
      .updateOne({ _id: id }, { $set: { prenom: prenom, nom: nom, email: email } });
     
    if (result.modifiedCount === 1) { // l'état est égale à 1 si la modification réussie sinon c'est 0
      res.status(200).json({ msg: "Modification réussie" }); //status 200 indique que la requete Http est ok
    } else {
      res.status(404).json({ msg: "Cet utilisateur n'existe pas" });// status 404 est un code d’erreur HTTP transmis par un serveur 
    }                                 //web quand une ressource demandée est indisponible ou que le serveur n’arrive pas à la trouver
  } catch (error) {
    console.log(error);
    res.status(501).json(error);// Le code d'état 501 indique que le serveur ne prend pas en charge la fonctionnalité 
  }                              // nécessaire pour répondre à la requête
  };

const deleteUtilisateur = async (req, res) => {
  try {
    let id = new ObjectID(req.params.id);
    let result = await client 
      .db()
      .collection("utilisateur")
      .deleteOne({ _id: id });
    if (result.deletedCount === 1) {
      res.status(200).json({ msg: "Suppression réussie" });
    } else {
      res.status(404).json({ msg: "Cet utilisateur n'existe pas" });
    }
  } catch (error) {
    console.log(error);

    res.status(501).json(error);
  }
};

module.exports = {
  ajouterUtilisateur,
  getUtilisateurs,
  getUtilisateur,
  updateUtilisateur,
  deleteUtilisateur,
};
