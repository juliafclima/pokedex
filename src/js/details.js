document.addEventListener("DOMContentLoaded", () => {
  const pokemonDetailsContainer = document.getElementById("pokemonDetails");

  const params = new URLSearchParams(window.location.search);
  const pokemonName = params.get("name");

  pokeapi.getPokemonsDetailByName(pokemonName).then((pokemon) => {
    const detailHtml = `
    <div class="card ${pokemon.types[0]}" data-id="${pokemon.order}">
    <span>#00${pokemon.order}</span>
    <h1>${pokemon.name}</h1>
    <img
      src="${pokemon.image}"
      alt="${pokemon.name}"
    />
    <div class="pokemon-tipos">
      ${pokemon.types
        .map((type) => `<span class="type ${type}">${type}</span>`)
        .join("")}
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
