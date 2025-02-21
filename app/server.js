const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Connexion à MongoDB
const mongoURI = "mongodb://localhost:27018/pokemon"; // Change en 27017 si nécessaire
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("🟢 Connecté à MongoDB"))
  .catch((err) => console.error("🔴 Erreur de connexion à MongoDB", err));

// Modèle Pokémon (Optionnel)
const pokemonSchema = new mongoose.Schema({
  name: String,
  type: [String],
});
const Pokemon = mongoose.model("Pokemon", pokemonSchema, "pokedex"); // Collection "pokedex"

app.get("/pokedex", async (req, res) => {
  try {
    const pokemons = await Pokemon.find();
    res.json(pokemons);
  } catch (err) {
    res.status(500).json({ error: "Erreur serveur" });
  }
});

app.listen(port, () => {
  console.log(`🚀 Serveur API lancé sur http://localhost:${port}`);
});
