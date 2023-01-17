const express = require("express");
const { connect } = require("./db/connect");
const routerUtilisateurs = require("./routers/utilisateur");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/", routerUtilisateurs);

connect("mongodb+srv://fadel:Thiaroye44@cluster0.arqzbdx.mongodb.net/test", (err) => {
  if (err) {
    console.log("Bonjour Fadel, une erreur lors de la connexion à la base de données");
    process.exit(-1);
  } else {
    console.log("Bonjour Fadel, vous êtes connecté à votre Base de données");
    app.listen(3000);
    console.log("Envoyer vos requêtes au port 3OOO");
  }
});
