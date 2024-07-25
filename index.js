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

// Import de ma clé 
const apiKey = process.env.API_KEY;


// ROUTE COMICS
app.get("/comics", async (req, res) => { // route en GET dont le chemin est /
  try {

    let query = `apiKey=${apiKey}`;

    if (req.query.title) {
      query = query + `&title=${req.query.title}`;
    }
    if (req.query.limit) {
      query = query + `&limit=${req.query.limit}`;
    }
    //if (req.query.page) {
    //  query = query + `&skip=${(req.query.page - 1) * 100}`;
    //}

    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics?${query}`
    );
    return res.status(200).json(response.data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});


// ROUTE COMIC
app.get("/comic/:comicId", async (req, res) => { // route en GET dont le chemin est /
  try {
    const comicId = req.params.comicId
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comic/${comicId}?apiKey=${apiKey}`
    );
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
app.get("/characters", async (req, res) => { // route en GET dont le chemin est /
  try {

    let query = `apiKey=${apiKey}`;

    if (req.query.name) {
      query = query + `&name=${req.query.name}`;
    }
    if (req.query.limit) {
      query = query + `&limit=${req.query.limit}`;
    }
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/characters?${query}`
    );
    return res.status(200).json(response.data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});


app.listen(process.env.PORT || 3200, () => {
  console.log("Server is live ❤️");  
});
