const express = require("express"); // import du package express
const app = express(); // création du serveur
app.use(cors());

// import axios
const axios = require("axios");

const apiKey = "QiNfGGKViu0A9iDb"

app.get("/", (req, res) => { // route en GET dont le chemion est /
  axios
  .get("https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=apiKey")
  .then((response) => {
    console.log(response.data); // Affichera la réponse du serveur
  })
  .catch(error => {
    console.log(error.message); // Affichera d'éventuelles erreurs, notamment en cas de problème de connexion Internet.
  });

  res.json({message : "Hi"}); // réponse du serveur : {message : "Hi"}
});


app.listen(process.env.PORT || 3200, () => {
  console.log("Server started");
});