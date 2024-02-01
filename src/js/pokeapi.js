const pokeapi = {};

function converterPokeApiDetailPokemon(pokeDetail) {
  const pokemon = new Pokemon();
  pokemon.order = pokeDetail.order;
  pokemon.name = pokeDetail.name;
  pokemon.types = pokeDetail.types.map((typeSlot) => typeSlot.type.name);
  pokemon.image = pokeDetail.sprites.other.dream_world.front_default;
  pokemon.height = pokeDetail.height;
  pokemon.weight = pokeDetail.weight;
  pokemon.abilities = pokeDetail.abilities.map(
    (abilitySlot) => abilitySlot.ability.name
  );
  pokemon.baseExperience = pokeDetail.base_experience;
  pokemon.stats = pokeDetail.stats.map((stat) => ({
    name: stat.stat.name,
    baseStat: stat.base_stat,
  }));

  return pokemon;
}

pokeapi.getPokemonsDetail = (pokemon) => {
  return fetch(pokemon.url)
    .then((response) => response.json())
    .then(converterPokeApiDetailPokemon);
};

pokeapi.getPokemons = (offset, limit) => {
  const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

  return fetch(url)
    .then((response) => response.json())
    .then((jsonBody) => jsonBody.results)
    .then((pokemons) => pokemons.map(pokeapi.getPokemonsDetail))
    .then((detailRequests) => Promise.all(detailRequests))
    .then((pokemonsDetails) => pokemonsDetails)
    .catch((error) => {
      console.error(error);
    });
};
