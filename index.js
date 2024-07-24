const express = require("express"); // import du package express
const app = express(); // création du serveur

// Variables DOTENV
// Permet d'activer les variables d'environnement qui se trouvent dans le fichier `.env`  
require('dotenv').config();

const axios = require("axios");

const cors = require("cors")
//le module cors permet d'autoriser ou non les demandes provenant de l'extérieur.
app.use(cors());

// Utilisation des parametre body
app.use(express.json())

// Import clé 
const apiKey = process.env.API_KEY;

// ROUTE COMICS
app.get("/comics", async (req, res) => { // route en GET dont le chemin est /
  try {
    const response = await axios.get(`https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=${apiKey}`);
    return res.status(200).json(response.data)
  } catch (err) {
       return res.status(401).send(err.message);
  }
});

// ROUTE COMICS CHARACTERID
app.get("/comics/:characterId", async (req, res) => { // route en GET dont le chemin est /
  // J'initialise ma constante en récupérant le parametre de mon l'url
  const characterId = req.params.characterId

  try {
    const response = await axios.get(`https://lereacteur-marvel-api.herokuapp.com/comics/${characterId}?apiKey=${apiKey}`);
    return res.status(200).json(response.data)
  } catch (err) {
       return res.status(401).send(err.message);
  }
});

app.listen(process.env.PORT || 3200, () => {
  console.log("Server started");  
});