document.addEventListener("DOMContentLoaded", function () {
  const apiUrl = "http://localhost:3000/pokedex";

  async function fetchPokemons() {
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error("Erreur de récupération des données");
      }

      const pokemons = await response.json();
      const pokemonList = document.getElementById("pokemon-list");

      pokemonList.innerHTML = "";

      pokemons.forEach((pokemon) => {
        const li = document.createElement("li");

        // On utilise les données disponibles
        const pokemonId = pokemon.pokedex_id;
        const category = pokemon.category || "Catégorie inconnue";
        const generation = pokemon.generation || "Génération inconnue";

        li.textContent = `#${pokemonId} - ${category} (Génération ${generation})`;
        pokemonList.appendChild(li);
      });
    } catch (error) {
      console.error("Erreur: ", error);
    }
  }

  fetchPokemons();
});
