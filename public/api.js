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
