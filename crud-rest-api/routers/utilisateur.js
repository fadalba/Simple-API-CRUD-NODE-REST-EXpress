const express = require("express"); // on appel le framework express installé et basé sur le Node js  
const {
  ajouterUtilisateur,
  getUtilisateurs,
  getUtilisateur,
  updateUtilisateur,
  deleteUtilisateur,
} = require("../controllers/utilisateur"); // on fait apple au fichier utilisateur basé inclus dans le dossier controleurs
const router = express.Router();

router.route("/utilisateurs").post(ajouterUtilisateur); /* pour ajouterUtilisateur */
router.route("/utilisateurs").get(getUtilisateurs); /* pour voir tous les utilisateurs*/
router.route("/utilisateurs/:id").get(getUtilisateur); /* pour voir un utilisateur spécifique par son id */
router.route("/utilisateurs/:id").put(updateUtilisateur); /* pour modifier un utilisateur spécifique par son id */
router.route("/utilisateurs/:id").delete(deleteUtilisateur); /* pour supprimer un utilisateur spécifique par son id */

module.exports = router;
