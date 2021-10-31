const CART2PRODUCTOS = 'https://japdevdep.github.io/ecommerce-api/cart/654.json';

var articulos;

function showCart(array) {

    let htmlContentToAppend = "";

    for (let i = 0; i < array.length; i++) {
        let articles = array[i];

        htmlContentToAppend = `

        <table class= "table">
        <thead class="table-dark">
        <tr>
        <th scopre="col"></th>
        <th scope="col">Nombre</th>
        <th scope="col">Precio Unitario</th>
        <th scope="col">Cantidad</th>
        <th scope="col">Subtotal</th>
        </tr>  
        </thead>
        <tr>
        <td><img src="` + articles.src + `" alt=" " class="img-thumbnail"></td>
        <td><h4 class="mb-1">`+ articles.name + `</h4></td>
        <td><p class="mb-1"> ` + articles.unitCost + ` ` + articles.currency + `<p/></td>
        <td><input value="" type="number" id="cantidad${i}" name="cantidad" min="1" max="100"></td>
        <td><span class="subtotal" id="subTotal${i}" style="font-weight:bold">${subtotal}</span></td>
        </table>`;
    
        document.getElementById("cart-container").innerHTML += htmlContentToAppend;

    }

    var subtotal = document.getElementsByName("cantidad");
    for (let index = 0; index < subtotal.length; index++) {
        var cantidad = document.getElementById(`cantidad${index}`).value;
        document.getElementById(`subTotal${index}`).value = parseInt(cantidad * subtotal[index].value);
    }

}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {

    getJSONData(CART2PRODUCTOS).then(function (result) {
        if (result.status === "ok") {
            articulos = result.data.articles;
            //console.log(articulos)
            showCart(articulos);


        }
    });
});

