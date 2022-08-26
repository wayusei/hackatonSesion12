// Generar una funcionalidad de búsqueda, solo que el usuario tiene la libertad de elegir un campo o más (se tiene la libertad de que los resultados aparezcan en automático o hasta que el usuario de click a un botón para comenzar la búsqueda)

const API_URL = "https://pokeapi.co/api/v2/pokemon/";

const xhr = new XMLHttpRequest();

function onRequestHandler() {
  if (this.readyState === 4 && this.status === 200) {
    const data = Object.entries(JSON.parse(this.response));
    const HTMLResponse = document.querySelector("#app");
  }
}
let data;

function apiByName(buscar) {
  const xhrequest = new XMLHttpRequest();

  xhrequest.addEventListener("load", function () {
    if (this.readyState === 4 && this.status === 200) {
      data = Object.entries(JSON.parse(this.response));
      console.log("Array: ", Array.isArray(data));
      console.log("data:", data);
    }
  });
  xhrequest.open("GET", `${API_URL}${buscar}`);
  xhrequest.send();
}

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

// Exponer HTMLResponse al scope global
const HTMLResponse = document.querySelector("#app");

// const printResults = document.getElementById("printResults");
const buttonSearch = document.getElementById("buttonSearch");

function print() {
  const inputSearch = document.getElementById("inputSearch");
  console.log("function print is running");
  var buscar = inputSearch.value;
  apiByName(buscar);
  console.log(data);
}

function search() {
  const searchType = document.getElementById("pokemon-search").value;
  if (searchType === "") {
    alert("Selecciona un filtro por favor e intentalo nuevamente.");
    return;
  }

  let inputSearch = document.getElementById("inputSearch").value.toLowerCase();
  saveSearch(inputSearch);

  const pokemonsLocalStorage = localStorage.getItem("pokemons");
  const pokemons = pokemonsLocalStorage ? JSON.parse(pokemonsLocalStorage) : [];
  const pokemonTypesLocalStorage = localStorage.getItem("pokemonTypes");
  const pokemonTypes = pokemonTypesLocalStorage
    ? JSON.parse(pokemonTypesLocalStorage)
    : [];

  let results = [];
  if (searchType === "name") {
    results = pokemons.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(inputSearch)
    );
  } else if (searchType === "type") {
    results = pokemonTypes.filter((type) =>
      type.name.toLowerCase().includes(inputSearch)
    );
  }

  renderList("results", results, "name");

  return results;
}

// Reads the user's search history from the local storage
function readSearchHistory() {
  let searches = localStorage.getItem("searchHistory");
  if (searches) {
    searches = JSON.parse(searches);
  } else {
    searches = [];
  }

  return searches;
}

// Updates the user's search history in the local storage
function saveSearch(search) {
  let searches = readSearchHistory();
  searches.push(search);
  localStorage.setItem("searchHistory", JSON.stringify(searches));
}

// Counts the total number of searches
function countSearches() {
  const searchHistory = readSearchHistory();
  return searchHistory.length;
}

// Retrieves recent searches from local storage
function getRecentSearches() {
  const searchHistory = readSearchHistory();
  let results = [...searchHistory];
  if (searchHistory.length >= 5) {
    results = searchHistory.slice(
      searchHistory.length - 5,
      searchHistory.length - 1
    );
  }
  return results;
}

// Renders a list in the UI
function renderList(listName, records, recordProperty = null) {
  const list = document.getElementById(listName);
  list.innerHTML = "";
  if (list.style.display === "none") list.style.display = "block";
  records.forEach((record) => {
    const listItem = document.createElement("li");
    listItem.className = "list-group-item";
    if (recordProperty) {
      listItem.append(record[recordProperty]);
    } else {
      listItem.append(record);
    }
    list.appendChild(listItem);
  });
}

// Retrieve pokemons and pokemon types and store them
// in the local storage when DOM content is loaded
document.addEventListener("DOMContentLoaded", async function (event) {
  const pokemons = await getPokemons();
  const types = await getTypes();

  if (localStorage.getItem("pokemons")) localStorage.removeItem("pokemons");
  if (localStorage.getItem("pokemonTypes"))
    localStorage.removeItem("pokemonTypes");

  localStorage.setItem("pokemons", JSON.stringify(pokemons));
  localStorage.setItem("pokemonTypes", JSON.stringify(types));

  buttonSearch.addEventListener("click", search);

  const totalSearches = document.getElementById("search-total");
  totalSearches.append(countSearches());

  const recentSearches = getRecentSearches();
  renderList("recent-searches", recentSearches);
});
