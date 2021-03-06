//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.



document.addEventListener("DOMContentLoaded", function (e) {

    document.getElementById("submitBtn").addEventListener("click", function(e) {
    
        let inputEmail = document.getElementById("inputEmail");
        let inputPassword = document.getElementById("inputPassword");
        let camposCompletos = true;

        if (inputEmail.value === '') {
            inputEmail.classList.add("invalid");
    
        }else{
            inputEmail.classList.remove("invalid")
        }

        if ( inputPassword.value === '') {
        inputPassword.classList.add("invalid");
        camposCompletos = false;
        }else{
            inputPassword.classList.remove("invalid");
        }

        if (camposCompletos) {
            localStorage.setItem("User-Logged", JSON.stringify({email: inputEmail.value}));
            window.location="inicio.html";
        }

        
    })
    
});