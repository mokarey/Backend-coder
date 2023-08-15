
 
 console.log("Hola front");
 const socket = io();

 socket.on("articulosList", (articulos) => {
    // Actualiza la lista de artículos en la página con los nuevos datos
    // Por ejemplo, puedes utilizar DOM manipulation o algún framework de frontend.
    const articlesContainer = document.getElementById("articles-container");
    articlesContainer.innerHTML = ""; // Limpia el contenedor

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

