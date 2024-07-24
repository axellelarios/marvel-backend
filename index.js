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

app.get("/", async (req, res) => { // route en GET dont le chemin est /
  console.log("hello")
  console.log(apiKey)
  try {
    const data = axios.get(`https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=${apiKey}`);
    res.status(200).json(data)
  } catch (err) {
      res.status(500).json({ message: 'Server error' })
  }
});


app.listen(process.env.PORT || 3200, () => {
  console.log("Server started");  
});