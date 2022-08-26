// Generar una funcionalidad de búsqueda, solo que el usuario tiene la libertad de elegir un campo o más (se tiene la libertad de que los resultados aparezcan en automático o hasta que el usuario de click a un botón para comenzar la búsqueda)

const API_URL = 'https://pokeapi.co/api/v2/pokemon/';

const xhr = new XMLHttpRequest();

function onRequestHandler() {
    if(this.readyState === 4 && this.status === 200){
       
        console.log(this.response);
        const data = Object.entries(JSON.parse(this.response));
        console.log(Array.isArray(data));
        console.log(data);
        const HTMLResponse = document.querySelector("#app");

    }
}
let data;

function apiByName(buscar) {
    const xhrequest = new XMLHttpRequest();

    xhrequest.addEventListener("load", function(){
        if(this.readyState === 4 && this.status === 200){
        data = Object.entries(JSON.parse(this.response));
        console.log("Array: ",Array.isArray(data));
        console.log("data:", data);

    }
    });
    xhrequest.open("GET",`${API_URL}${buscar}`);
    xhrequest.send();    
}

console.log("nueva linea de texto, data antes de buscar: ", data);

// Exponer HTMLResponse al scope global
const HTMLResponse = document.querySelector("#app");

// const printResults = document.getElementById("printResults");
const buttonSearch = document.getElementById("buttonSearch");

function print(){
    const inputSearch = document.getElementById("inputSearch");
    console.log("function print is running");
    var buscar = inputSearch.value;
    // var inputSearch = inputSearch.value.toUpperCase();
    console.log("Buscar: ",buscar)
    apiByName(buscar);
    console.log(data);
    }
// printResults.addEventListener("click", print);
buttonSearch.addEventListener("click", print);