//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.


var productsArray = [];
var minCost = undefined;
var maxCost = undefined;

const URL_PRODUCTOS = " https://japdevdep.github.io/ecommerce-api/product/all.json "

function sortProducts(criterio, array) {
    let result = [];

    if (criterio === 1) {
        result = array.sort(function (a, b) {
            if (a.cost < b.cost) { return -1; }
            if (a.cost > b.cost) { return 1; }
            return 0;
        });
    } else if (criterio === 2) {
        result = array.sort(function (a, b) {
            if (a.cost > b.cost) { return -1; }
            if (a.cost < b.cost) { return 1; }
            return 0;
        });
    } else if (criterio === 3) {
        result = array.sort(function (a, b) {
            if (a.soldCount > b.soldCount) { return -1; }
            if (a.soldCount < b.soldCount) { return 1; }
            return 0;
        });
    }

    return result;
}

function showProducts(array) {

    let htmlContentToAppend = "";
    for (let i = 0; i < array.length; i++) {
        let products = array[i];

        if (((minCost == undefined) || (minCost != undefined && parseInt(products.cost) >= minCost)) &&
            ((maxCost == undefined) || (maxCost != undefined && parseInt(products.cost) <= maxCost))) {


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
        }
        document.getElementById("cat-list-products").innerHTML = htmlContentToAppend;
    }
}

/*------------ Esta parte de codigo la tuve que cambiar para esta nueva funcionalidad------------

document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(URL_PRODUCTOS).then(function (resultado) {
        if (resultado.status === "ok") {
            productsArray = resultado.data;
            showProducts(productsArray);
        }
    });
});
--------------------------------------------------------------------*/
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(URL_PRODUCTOS).then(resultado => {
        productsArray = resultado.data;
        showProducts(productsArray);

    });

    document.getElementById("sortMayor").addEventListener("click", function () {
        productsArray = sortProducts(1, productsArray);
        showProducts(productsArray);
    });

    document.getElementById("sortMenor").addEventListener("click", function () {
        productsArray = sortProducts(2, productsArray);
        showProducts(productsArray);
    });
    document.getElementById("sortByRelevancia").addEventListener("click", function () {
        productsArray = sortProducts(3, productsArray);
        showProducts(productsArray);
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function () {
        document.getElementById("rangeFilterCostMin").value = "";
        document.getElementById("rangeFilterCostMax").value = "";

        minCost = undefined;
        maxCost = undefined;

        showProducts(productsArray);
    });

    document.getElementById("rangeFilterCost").addEventListener("click", function () {

        minCost = document.getElementById("rangeFilterCostMin").value;
        maxCost = document.getElementById("rangeFilterCostMax").value;

        if ((minCost != undefined) && (minCost != "") && (parseInt(minCost)) >= 0) {
            minCost = parseInt(minCost);
        }
        else {
            minCost = undefined;
        }

        if ((maxCost != undefined) && (maxCost != "") && (parseInt(maxCost)) >= 0) {
            maxCost = parseInt(maxCost);
        }
        else {
            maxCost = undefined;
        }

        showProducts(productsArray);
    });

});
