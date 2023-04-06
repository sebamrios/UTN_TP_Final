const fecha = new Date();

const start = document.getElementById("start");

const end = document.getElementById("end");

start.value = fecha;
end.value = "";

let today = new Date();
let dd = today.getDate();
let ddPlus1 = today.getDate() + 1
let mm = today.getMonth() + 1; //January is 0!
let yyyy = today.getFullYear();
if (dd < 10) {
    dd = '0' + dd
}
if (mm < 10) {
    mm = '0' + mm
}

today = yyyy + '-' + mm + '-' + dd;

start.min = today;
end.min = today;

function validar() {
    if (start.value >= end.value) {
        alert("La fecha de salida debe ser posterior a la entrada")
    }
}

// validar() Ejecutar con la llamada de un boton
