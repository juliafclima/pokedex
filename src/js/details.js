const pokemonDetailsContainer = document.getElementById("pokemonDetails");

function carregarDetalhesPokemon() {
  const params = new URLSearchParams(window.location.search);
  
  const pokemonId = params.get("id");
  console.log(pokemonId);
  
  if (pokemonId) {
    
    pokeapi
      .getPokemonsDetail({
        url: `https://pokeapi.co/api/v2/pokemon/${pokemonId}/`,
      })
      .then((pokemon) => {

        pokemonDetailsContainer.innerHTML = `
          <div class="pokemon ${pokemon.types[0]}" data-id="${pokemon.order}">
            <span class="number">Número: #00${pokemon.order}</span>
            <span class="name">${pokemon.name}</span>
            <div class="detail">
              <div class="types">
                ${pokemon.types
                  .map((type) => `<span class="type ${type}">${type}</span>`)
                  .join("")}
              </div>
              <img src="${pokemon.image}" alt="${pokemon.name}" />
            </div>
          </div>
        `;
      })
      .catch((error) => {
        console.error(error);
      });
  }
}

document.addEventListener("DOMContentLoaded", carregarDetalhesPokemon);
