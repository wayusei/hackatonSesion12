async function getPokemons() {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon/");
  const pokemons = await response.json();
  return pokemons.results;
}

async function getTypes() {
  const response = await fetch("https://pokeapi.co/api/v2/type");
  const types = await response.json();
  return types.results;
}

function renderList(listName, records, recordProperty) {
  const list = document.getElementById(listName);
  records.forEach((record) => {
    const listItem = document.createElement("li");
    listItem.className = "list-group-item";
    console.log(listItem);
    listItem.append(record[recordProperty]);
    list.appendChild(listItem);
  });
}

async function showPokemons() {
  const pokemons = await getPokemons();
  renderList("pokemons-list", pokemons, "name");
}

async function showTypes() {
  const types = await getTypes();
  renderList("pokemon-types", types, "name");
}

showPokemons();
showTypes();
