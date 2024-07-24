const express = require("express"); // import du package express
const app = express(); // création du serveur

//le module cors permet d'autoriser ou non les demandes provenant de l'extérieur.
const cors = require("cors")
app.use(cors());

// Variables DOTENV
// Permet d'activer les variables d'environnement qui se trouvent dans le fichier `.env`  
require('dotenv').config();

// Import clé 
const apiKey = process.env.API_KEY;

// import axios
const axios = require("axios");


let comicData;
axios
.get(`https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=${apiKey}`) 
.then((res) => {
  console.log(res)
  comicData = res.comicData; 
})
.catch(error => {
  console.log(error.message); // Affichera d'éventuelles erreurs
});


app.get("/", (req, res) => { // route en GET dont le chemin est /
  res.json(comicData); // réponse du serveur : json comicData}
});


app.listen(process.env.PORT || 3200, () => {
  console.log("Server started");  
});