document.addEventListener("DOMContentLoaded", () => {
  const pokemonList = document.getElementById("pokemonList");
  const botaoMore = document.getElementById("loadMoreBtn");
  const maxRecords = 151;
  const limite = 26;
  let offset = 0;

  function exibirMais(offset, limite) {
    pokeapi.getPokemons(offset, limite).then((pokemons = []) => {
      const newList = pokemons
        .map(
          (pokemon) => `
            <li class="pokemon ${pokemon.types[0]}" data-name="${pokemon.name}">
              <span class="number">#00${pokemon.order}</span>
              <span class="name">${pokemon.name}</span>
              <div class="detail">
                <ol class="types">
                  ${pokemon.types
                    .map((type) => `<li class="type ${type}">${type}</li>`)
                    .join("")}
                </ol>
                <img src="${pokemon.image}" alt="${pokemon.name}" />
              </div>
            </li>`
        )
        .join("");

      if (pokemonList) {
        pokemonList.innerHTML += newList;

        const pokemonItems = document.querySelectorAll(".pokemon");

        pokemonItems.forEach((item) => {
          item.addEventListener("click", () => {
            const pokemonName = item.dataset.name;
            window.location.href = `details.html?name=${pokemonName}`;
          });
        });
      } else {
        console.error("Elemento pokemonList não encontrado.");
      }
    });
  }

  exibirMais(offset, limite);

  botaoMore.addEventListener("click", () => {
    offset += limite;

    const qntRecordsProximaPagina = offset + limite;

    if (qntRecordsProximaPagina >= maxRecords) {
      const newLimite = maxRecords - offset;
      exibirMais(offset, newLimite);

      botaoMore.parentElement.removeChild(botaoMore);
    } else {
      exibirMais(offset, limite);
    }
  });
});
