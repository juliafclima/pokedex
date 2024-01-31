document.addEventListener("DOMContentLoaded", () => {
  const pokemonDetailsContainer = document.getElementById("pokemonDetails");

  // Get Pokemon name from URL
  const params = new URLSearchParams(window.location.search);
  const pokemonName = params.get("name");

  // Fetch and display Pokemon details
  pokeapi.getPokemonsDetailByName(pokemonName).then((pokemon) => {
    const detailHtml = `
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
    pokemonDetailsContainer.innerHTML = detailHtml;
  });
});

pokeapi.getPokemonsDetailByName = (pokemonName) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}/`;

  return fetch(url)
    .then((response) => response.json())
    .then(converterPokeApiDetailPokemon)
    .catch((error) => {
      console.error(error);
    });
};
