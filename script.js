//-----------------------Funcion cotizar------------------------------------------------
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
let fechaa = new Date();
let dia = fechaa.getDate();
let mes = fechaa.getMonth() + 1; // Sumamos 1 porque los meses comienzan en 0
let anio = fechaa.getFullYear();
let fechaActual = dia + "/" + mes + "/" + anio;


const apiKey = '97a814c2c47483498d79c66f71c62e89'; // reemplazar con tu API key

const boton = document.getElementById('boton');
const weatherInfo = document.getElementById('weather-info');
const hoy1=document.getElementById('hoy');
const manana1=document.getElementById('manana');
const pasado1=document.getElementById('pasado')
const fechaV=document.getElementById('fecha')
const fecha1=document.getElementById('fechaT')
const city = document.getElementById('city')
const spanHoy = document.getElementById('hoyT')
const spanManana = document.getElementById('mananaT')
const spanPasado = document.getElementById('pasadoT')

boton.addEventListener('click', e => {
	e.preventDefault();
  const city = document.getElementById('city').value
	getWeather(city);
});

async function getWeather(city) {
	try {
    if(city=="none"){   //si no hay ciudad, por defecto CORRIENTES
      const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=corrientes&appid=${apiKey}&units=metric`);
      const data = await response.json();
      showWeather(data);
      
    }
    else {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`);
      const data = await response.json();
      showWeather(data);
      
    }
	} catch (error) {
		console.error(error);
	}
}

function showWeather(data) {
  const fechaCompleta = data.list[0].dt_txt ;
  const fecha = new Date(fechaCompleta);
  const fechaFormateada = fecha.toLocaleDateString(); 

  let diasSemana = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
  let hoy = diasSemana[fecha.getDay()-1];       //el dia de hoy
  let manana = diasSemana[fecha.getDay()];      //el dia de manana
  let pasado = diasSemana[fecha.getDay()+1];    //el dia de pasado manana
 
  fecha1.textContent= `${fechaFormateada}`
  console.log("inicio")
  console.log(fecha1.textContent)
  console.log("fin")

  fecha1.innerHTML = `<i class="bi bi-cloud-rain">${hoy}</i>`
  
  spanHoy.innerHTML = `${hoy}`
  spanManana.innerHTML = `${manana}`
  spanPasado.innerHTML = `${pasado}`

  hoy1.value = `${data.list[16].weather[0].main}, ${data.list[16].main.temp}°C `
  hoy1.textContent = `${hoy}`
  console.log(hoy)
  manana1.value = `${data.list[16].weather[0].main}, ${data.list[17].main.temp}°C `
  manana1.textContent = `${manana}`
  console.log(manana)
  pasado1.value = `${pasado1}`
  pasado1.textContent = `${pasado1}`
  console.log(pasado)
  pasado1.value = `${data.list[16].weather[0].main}, ${data.list[18].main.temp}°C `
   
}

//-----------------------Funcion geolocalizacion------------------------------------------------
// La clave de API de OpenCage Geocoder

const city1=document.getElementById("city1")
const API_KEY = '14e79d4ac1774007958cf5bc795ee222';

// La latitud y longitud de la ubicación para la que deseas obtener la ciudad (ejemplo: París, Francia)

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(showPosition);
} else {
  console.log("La geolocalización no está soportada en tu navegador");
}

function showPosition(position) {
  console.log("Latitud: " + position.coords.latitude + " Longitud: " + position.coords.longitude);
  const latitud = position.coords.latitude;
  const longitud = position.coords.longitude;

  let url1 = `https://api.opencagedata.com/geocode/v1/json?q=${latitud},+${longitud}&key=14e79d4ac1774007958cf5bc795ee222&language=es&pretty=1`

  console.log(url1)

  // Realiza la solicitud a la API utilizando fetch
  fetch(url1)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      // Obtén la ciudad de la ubicación utilizando la información de la API de OpenCage Geocoder
      const city2 = data.results[0].components.city_district;
      city1.value = `${ city2 }`
      city.value = `${city2}`
      // Muestra la ciudad en la consola del navegador
      console.log(`La ciudad más cercana a la ubicación (${latitud}, ${longitud}) es ${city2}`);
    })
    .catch(error => console.error(error));
  
}
