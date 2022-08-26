// Generar una funcionalidad de búsqueda, solo que el usuario tiene la libertad de elegir un campo o más (se tiene la libertad de que los resultados aparezcan en automático o hasta que el usuario de click a un botón para comenzar la búsqueda)



const HTMLResponse = document.querySelector("#app");

// const printResults = document.getElementById("printResults");
const buttonSearch = document.getElementById("buttonSearch");

function print(){
    console.log("function print is running");
    
    }
// printResults.addEventListener("click", print);
buttonSearch.addEventListener("click", print);