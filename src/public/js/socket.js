
 
 console.log("Hola front");
 const socket = io();

 // se inyectan los articulos mediante inner
 socket.on("articulosList", (articulos) => {
    const articlesContainer = document.getElementById("articles-container");
    articlesContainer.innerHTML = ""; 

    articulos.forEach((articulo) => {
        const articleDiv = document.createElement("div");
        articleDiv.innerHTML = `
            <h1>${articulo.titulo}</h1>
            <p>${articulo.descripcion}</p>
            <p>${articulo.precio}</p>
            <p>${articulo.stock}</p>
        `;
        articlesContainer.appendChild(articleDiv);
    });
});

