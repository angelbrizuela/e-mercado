//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.


const URL_PRODUCTOS = " https://japdevdep.github.io/ecommerce-api/product/all.json "

var productsArray = [];

function showProducts(array) {

    let htmlContentToAppend = "";
    for (let i = 0; i < array.length; i++) {
        let products = array[i];

        htmlContentToAppend += `
        <div class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src="` + products.imgSrc + `" alt=" " class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-1">`+ products.name + `</h4>
                       </div>
                         <p class="mb-1">` + products.description + `</p> <br>
                         <p class="mb-1"> ` + products.cost + ` ` + products.currency + `<p/> 
                         <small class="text-muted">` + products.soldCount + ` unidades vendidas</small>
                </div>
            </div>
        </div>
        `

        document.getElementById("cat-list-products").innerHTML = htmlContentToAppend;
    }
}

document.addEventListener("DOMContentLoaded", function (e) {

    getJSONData(URL_PRODUCTOS).then(function (resultado) {
        if (resultado.status === "ok") {
            productsArray = resultado.data;

            showProducts(productsArray);


        }


    });

});


//name , description , cost, currency, imgSrc, soldCount