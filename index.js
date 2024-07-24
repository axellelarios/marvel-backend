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
    // - paramètres de recherche (titre et page)
    console.log(req.query);
    let query = `apiKey=${process.env.MARVEL_API_KEY}`;

    if (req.query.title) {
      query = query + `&title=${req.query.title}`;
    }
    if (req.query.page) {
      query = query + `&skip=${(req.query.page - 1) * 100}`;
    }

    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics?${query}`
    );
    console.log(response.data);
    return res.status(200).json(response.data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// ROUTE COMICS CHARACTERID
app.get("/comics/:characterId", async (req, res) => { // route en GET dont le chemin est /
  // J'initialise ma constante en récupérant le parametre characterId de mon l'url
  const characterId = req.params.characterId

  try {
    const response = await axios.get(`https://lereacteur-marvel-api.herokuapp.com/comics/${characterId}?apiKey=${apiKey}`);
    return res.status(200).json(response.data)
  } catch (err) {
       return res.status(401).send(err.message);
  }
});

// ROUTE COMICS CHARACTERS
app.get("/characters", async (req, res) => {
  try {
    //  - paramètre de recherche (nom)
    // console.log(req.query.name);

    let query = `apiKey=${process.env.MARVEL_API_KEY}`;

    if (req.query.name) {
      query = query + `&name=${req.query.name}`;
    }
    if (req.query.page) {
      query = query + `&skip=${(req.query.page - 1) * 100}`;
    }

    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/characters?${query}`
    );
    console.log(response.data);
    return res.status(200).json(response.data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

app.listen(process.env.PORT || 3200, () => {
  console.log("Server started");  
});
