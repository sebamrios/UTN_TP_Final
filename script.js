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
  $("#personas");
  $("#modal")
  $("#start").attr("min",today);
  $("#end").attr("min",today);
  $("#cotizar").click(()=>{
    diferencia()
    validar()
    personas.value=" ";
    start.value=" ";
    end.value=" ";
    car.checked=false;
  })
}) 

let valorEstadidaDolar = 50;//precio expresado al valor del dolar blue

let valorBlue;


$(document).ready(function(){
  const url = "https://api.bluelytics.com.ar/v2/latest";
  $("#cotizar").click(function(){
    $.ajax({
      url: url,
      type:"GET",
      success: function(result){
        valorBlue=result.blue.value_sell
      },
      error:function(error){
        console.log(`Error${error}`)
      }
    })
  })
})

function validar() {
    if(start.value>=end.value){
        modal.innerText= "La fecha de salida debe ser posterior a la entrada"    
      }else{
      modal.innerText= `Usted reservo para la fecha ${start.value}, por ${diferencia()} días, con fecha de salida el ${end.value} paras ${personas.value} personas ${auto()} El precio en pesos de acuerdo al dolar blue es ${dias*valorBlue*valorEstadidaDolar}`   
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


