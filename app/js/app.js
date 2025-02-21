const apiUrl = "http://localhost:27018"; // Change si ton API est sur un autre port

// Fonction pour récupérer et afficher les Pokémon
async function fetchPokemons() {
    try {
        const response = await fetch(apiUrl);
        const pokemons = await response.json();
        const container = document.getElementById("pokemon-list");
        container.innerHTML = "";
        
        pokemons.forEach(pokemon => {
            container.innerHTML += `
                <div class="pokemon-card">
                    <h3>${pokemon.name}</h3>
                    <p>Type: ${pokemon.type}</p>
                    <p>HP: ${pokemon.hp}</p>
                    <p>Attack: ${pokemon.attack}</p>
                </div>
            `;
        });
    } catch (error) {
        console.error("Erreur lors du chargement des Pokémon:", error);
    }
}

// Fonction pour rechercher un Pokémon par son nom
async function searchPokemon() {
    const searchTerm = document.getElementById("search").value;
    if (!searchTerm) return alert("Entrez un nom !");
    
    try {
        const response = await fetch(`${apiUrl}/${searchTerm}`);
        const pokemon = await response.json();

        if (pokemon.message) {
            alert("Pokémon non trouvé !");
            return;
        }

        document.getElementById("pokemon-list").innerHTML = `
            <div class="pokemon-card">
                <h3>${pokemon.name}</h3>
                <p>Type: ${pokemon.type}</p>
                <p>HP: ${pokemon.hp}</p>
                <p>Attack: ${pokemon.attack}</p>
            </div>
        `;
    } catch (error) {
        console.error("Erreur lors de la recherche du Pokémon:", error);
    }
}

// Charger les Pokémon au démarrage
fetchPokemons();
