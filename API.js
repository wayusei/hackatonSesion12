const API_URL = 'https://www.themealdb.com';

const xhr = new XMLHttpRequest();

function onRequestHandler() {
    if(this.readyState === 4 && this.status === 200){
        //0 = UNSET no se ha llamado al metodo open
        //1 = OPENED , se ha llamado al metodo opened
        //2 = HEADERS_RECEIVED, se está llamando al metodo send()
        //3 = LOADING, esta cargando, es decir, esta recibiendo la respuesta
        //4 = DONE , se ha completado la operacion del
        console.log(this.response);
        const data = Object.entries(JSON.parse(this.response));
        console.log(Array.isArray(data));
        console.log(data);
        const HTMLResponse = document.querySelector("#app");

        const template = data.map((meals) => `<li>${meals.strMeal}</li>`);
        HTMLResponse.innerHTML = `<ul>${template}</ul>`;
    }
}
let data;

// function onRequestHandler() {
//     if(this.readyState === 4 && this.status === 200){
//         //0 = UNSET no se ha llamado al metodo open
//         //1 = OPENED , se ha llamado al metodo opened
//         //2 = HEADERS_RECEIVED, se está llamando al metodo send()
//         //3 = LOADING, esta cargando, es decir, esta recibiendo la respuesta
//         //4 = DONE , se ha completado la operacion del
//         console.log(this.response);
//         data = Object.entries(JSON.parse(this.response));
//         console.log(Array.isArray(data));
//         console.log(data);
//         const HTMLResponse = document.querySelector("#app");

//         const template = data.map((meals) => `<li>${meals.strMeal}</li>`);
//         HTMLResponse.innerHTML = `<ul>${template}</ul>`;
//     }
// }

function apiByName(nameSearch) {
    const xhrequest = new XMLHttpRequest();

    xhrequest.addEventListener("load", function(){
        if(this.readyState === 4 && this.status === 200){
        //0 = UNSET no se ha llamado al metodo open
        //1 = OPENED , se ha llamado al metodo opened
        //2 = HEADERS_RECEIVED, se está llamando al metodo send()
        //3 = LOADING, esta cargando, es decir, esta recibiendo la respuesta
        //4 = DONE , se ha completado la operacion del
        data = Object.entries(JSON.parse(this.response));
        // const template = data.map((meals) => `<li>${meals.strMeal}</li>`);
        console.log("Array: ",Array.isArray(data));
        console.log("data:", data);

    }
    });
    xhrequest.open("GET",`${API_URL}/api/json/v1/1/search.php?s=${nameSearch}`);
    xhrequest.send();    
}
/*
xhr.addEventListener("load", onRequestHandler);
xhr.open("GET",`${API_URL}/api/json/v1/1/random.php`);
xhr.send();*/
console.log("nueva linea de texto, data antes de buscar: ", data);

// Exponer HTMLResponse al scope global
const HTMLResponse = document.querySelector("#app");