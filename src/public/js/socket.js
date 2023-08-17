console.log("Hola front");
const socket = io();
 
 // se inyectan los articulos mediante inner
 socket.on("articulosList", (articulos) => {
    const articlesContainer = document.getElementById("articulos-list");
    articlesContainer.innerHTML = "";

    articulos.forEach((articulo) => {
        const articleDiv = document.createElement("div");
        articleDiv.setAttribute("id", `articulo-${articulo.id}`);
        articleDiv.innerHTML = `
            <h1>${articulo.titulo}</h1>
            <p>${articulo.descripcion}</p>
            <p>${articulo.precio}</p>
            <p>${articulo.stock}</p>
            <button class="delete-button" data-id="${articulo.id}">Eliminar</button>
        `;
        articlesContainer.appendChild(articleDiv);
    });
});
 
 // Realizamos la llamada y eliminamos el articulo cuyo ID asignado corresponda--
socket.on("articuloEliminado", (id) => {
    const deletedArticle = document.getElementById(`articulo-${id}`);
    if (deletedArticle) {
        deletedArticle.remove();
    }
    console.log("Articulo eliminado!");
});

// Agrego un eventListener para utilizar el boton de eliminar--
document.addEventListener("click", (event) => {
    if (event.target.classList.contains("delete-button")) {
        const id = event.target.getAttribute("data-id");
        socket.emit("deleteArticulo", id);
    }
});


 // se muestran los nuevos artticulos--
socket.on("nuevoArticulo", (articulo) => {
    mostrarArticulo(articulo);
});

function mostrarArticulo(articulo) {
    const articlesContainer = document.getElementById("articulos-list");
    const articleDiv = document.createElement("div");
    articleDiv.setAttribute("id", `articulo-${articulo.id}`);
    articleDiv.innerHTML = `
        <h1>${articulo.titulo}</h1>
        <p>${articulo.descripcion}</p>
        <p>${articulo.precio}</p>
        <p>${articulo.stock}</p>
        <button class="delete-button" data-id="${articulo.id}">Eliminar</button>
    `;
    articlesContainer.appendChild(articleDiv);
}
 

