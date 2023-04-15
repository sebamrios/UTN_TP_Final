let today = new Date();
let dd = today.getDate();
let mm = today.getMonth() + 1; //January is 0!
let yyyy = today.getFullYear();
if (dd < 10) {
  dd = '0' + dd
}
if (mm < 10) {
  mm = '0' + mm
}

today = yyyy + '-' + mm + '-' + dd;

let dias;

function diferencia(){
  const fechaInicio = new Date(start.value).getTime();
  const fechaFin    = new Date(end.value).getTime();
  const diff = fechaFin - fechaInicio;
  dias = diff/(1000*60*60*24);
  return dias
}

diferencia();

$(document).ready(()=>{
  $("#email");
  $("#personas");
  $("#modal");
  $("#start").attr("min",today);
  $("#end").attr("min",today);
  $("#cotizar").click(()=>{
    diferencia();
    validar();
    personas.value=" ";
    start.value=" ";
    end.value=" ";
    email.value=" ";
    car.checked=false;
  })
}) 

let valorEstadidaDolar = 50;//precio expresado en dolares

let valorBlue;

// Peticion fetch 
const url = 'https://api.bluelytics.com.ar/v2/latest'
fetch(url)
.then(res => res.json())
.then(res => {
    valorBlue = res.blue.value_sell
})


function validar() {
      if(email.value==""){
        modal.innerText="Ingrese un correo valido"
      }else if(personas.value<1){
        modal.innerText="Ingrese un número valido de visitantes"
      }else if(start.value>=end.value){
        modal.innerText= "La fecha de salida debe ser posterior a la entrada"    
      }else{
      modal.innerText= `Usted reservo para la fecha ${start.value}, por ${diferencia()} día/s, con fecha de salida el ${end.value} para ${personas.value} persona/s ${auto()} El precio en pesos de acuerdo al dolar blue es ${dias*valorBlue*valorEstadidaDolar} Si lo desea esta infromación se enviara a ${email.value}`   
    }
    return
}

function auto(){
  if($('#car').prop("checked")==true){
    return("en auto.")}
  else{
    return(".")
  }
}

//-----------------------Funcion pronosticar clima------------------------------------------------

// Scrip de API Clima
const boton = document.getElementById("botonClima")
const ImprimirDatos = document.getElementById("ImprimirDatos")


function getWeather() {
  let hoy = "HOY"
  let nombreCiudad = document.getElementById("ciudad").value


  console.log(nombreCiudad)

  let url = `https://api.openweathermap.org/data/2.5/weather?q=${nombreCiudad}&appid=97a814c2c47483498d79c66f71c62e89`
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      let temp = data.main.temp - 273.15;
      let icon = data.weather[0].description;
      let lugar = data.name;
      lugar += " -" + data.sys.country;
      console.log(icon);
      temp = temp.toFixed(2);
      ImprimirDatos.innerHTML = `
            <p>${hoy} </p>
            <p>${lugar}</p>
            <p>${temp} C° </p>
            <p>${icon} </p>
            `
    });
  console.log("hola");
}
boton.addEventListener("click", getWeather)
