
var producto;
var comentariosArray;
var showRelProducts;


function showProducto(product, arraycomments) {

    let info = "";
    let imgs = "";
    let comments = "<hr>";

    info += `
               <br><br><h2 class="text-center"> ${product.name} </h2><br>
               <p>${product.description}</p>
               <strong>Precio: ${product.cost}</strong>
               <strong>${product.currency}</strong><br>
               Unidades vendidas: ${product.soldCount}
               ${product.category}<br><br><br><br>
               `;

    imgs += `
             
              <img src="img/prod1_1.jpg" class="img-fluid">
              <img src="img/prod1_2.jpg" class="img-fluid">
              <img src="img/prod1_3.jpg" class="img-fluid">
              <img src="img/prod1_4.jpg" class="img-fluid">
              
              `;

   

    arraycomments.forEach(function (comment) {

        let puntos = "";

        comments += `<p>` + comment.dateTime + `</p>`;
        comments += `<strong>` + comment.user + `</strong> dice:<br>`;
        comments += `<p>` + comment.description + `</p><br>`;

        for (let i = 1; i <= comment.score; i++) {
            puntos += `<span class="fa fa-star checked"></span>`;
        }

        for (let i = comment.score + 1; i <= 5; i++) {
            puntos += `<span class="fa fa-star"></span>`;
        }

        comments += `<div >${puntos}</div><br><hr>`;
    });

    


    document.getElementById("contenido").innerHTML = info;
    document.getElementById("imagenes").innerHTML = imgs;
    document.getElementById("comentarios").innerHTML = comments;


  
}


function showRelProducts(array1, array3){

    let htmlContentToAppend = "";

    for(let i = 0; i < array3.lenght; i++){

        htmlContentToAppend+= `
        <div>
             <img class="img-fluid " ` + array1[array3[i]].imgSrc + `>
        </div>
        `
    }

    document.getElementById("relatedProducts").innerHTML = htmlContentToAppend;


};




document.addEventListener("DOMContentLoaded", function (e) {


    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            comentariosArray = resultObj.data;

        }

        getJSONData(PRODUCT_INFO_URL).then(function (result) {
            if (result.status === "ok") {
                producto = result.data;
                showProducto(producto, comentariosArray);
            

            }
        });

    });

});