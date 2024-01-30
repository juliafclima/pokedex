const pokemonList = document.getElementById("pokemonList");
const botaoMore = document.getElementById("loadMoreBtn");

const maxRecords = 11; // 151
const limite = 20;
let offset = 0;

function exibirMais(offset, limite) {
  pokeapi.getPokemons(offset, limite).then((pokemons = []) => {
    const newList = pokemons
      .map(
        (pokemon) => `
          <li class="pokemon ${pokemon.types[0]}">
            <span class="number">#00${pokemon.order}</span>
            <span class="name">${pokemon.name}</span>
            <div class="detail">
              <ol class="types">
                ${pokemon.types
                  .map((type) => `<li class="type ${type}">${type}</li>`)
                  .join("")}
              </ol>
              <img
                src="${pokemon.image}"
                alt="${pokemon.name}"
              />
            </div>
          </li>`
      )
      .join("");
    pokemonList.innerHTML += newList;
  });
}

exibirMais(offset, limite);

botaoMore.addEventListener("click", () => {
  offset += limite;

  const qntRecordsProximaPagina = offset + limite;

  if ((qntRecordsProximaPagina) => maxRecords) {
    const newLimite = qntRecordsProximaPagina - maxRecords;
    exibirMais(offset, newLimite);
  }
});
