const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(
  cors({
    origin: "http://10.5.0.2:8080",
  })
);
app.use(express.json());

const mongoURI = "mongodb://root:password@db:27017/pokemon?authSource=admin";
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connecté à MongoDB"))
  .catch((err) => console.error("Erreur de connexion à MongoDB", err));

const pokemonSchema = new mongoose.Schema({
  pokedex_id: Number,
  generation: Number,
  category: String,
  name: String,
  sprites: {
    regular: String,
    shiny: String,
    gmax: String,
  },
  types: {
    type: [String], // tableau de types de Pokémon
    default: [],
  },
  talents: {
    type: [String],
    default: [],
  },
  stats: {
    type: [String],
    default: [],
  },
  resistances: {
    type: [String],
    default: [],
  },
  evolution: {
    type: [String],
    default: [],
  },
  height: String,
  weight: String,
  egg_groups: {
    type: [String],
    default: [],
  },
  sexe: String,
  catch_rate: String,
  level_100: String,
  formes: String,
});
const Pokemon = mongoose.model("Pokemon", pokemonSchema, "pokedex");

app.get("/pokedex", async (req, res) => {
  try {
    console.log("Tentative de récupération des pokémons...");
    const pokemons = await Pokemon.find();
    console.log("Pokémons récupérés:", pokemons);
    res.json(pokemons);
  } catch (err) {
    console.error("Erreur serveur:", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

app.listen(port, () => {
  console.log(`Serveur API lancé sur http://localhost:${port}`);
});
