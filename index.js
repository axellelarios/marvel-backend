const express = require("express"); // import du package express
const app = express(); // création du serveur

// import axios
const axios = require("axios");

//le module cors permet d'autoriser ou non les demandes provenant de l'extérieur.
const cors = require("cors")
app.use(cors());

// Variables DOTENV
// Permet d'activer les variables d'environnement qui se trouvent dans le fichier `.env`  
require('dotenv').config();

// Import clé 
const apiKey = process.env.API_KEY;

app.get("/", async (req, res) => { // route en GET dont le chemin est /
  return res.json({message : "hello"})
});

app.listen(process.env.PORT || 3200, () => {
  console.log("Server started");  
});