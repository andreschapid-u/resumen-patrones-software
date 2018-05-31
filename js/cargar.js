// const data = $.load("./patrones.json");
$(window).on('load', function () {
  $(".loader").fadeOut("slow");
});
let data;
// $.getJSON("/patrones.json", function (result, status, xhr) {
$.getJSON("https://raw.githubusercontent.com/andreschapid-u/resumen-patrones-software/gh-pages/patrones.json", function (result, status, xhr) {
  console.log(status);

  if (status == "success") {
    data = JSON.parse(xhr.responseText);
  } else {
    data = [];
  }
}).then(function () {
  cargarDatos(data);
});

function cargarDatos(data) {
  console.log(data);
  for (i = 0; i < data.length; i++) {
    // if(data[i].tipo == "Creacional"){
    // }
    let contenerdor = document.getElementById("patrones");
    crearCard(contenerdor, data[i], i);
  }
}

function crearCard(contenerdor, patron, i) {
  const div = document.createElement("div");
  div.classList.add("col-6", "col-md-4", "col-lg-4");
  // let card = '<div class="col-6 col-md-4 col-lg-4">';

  let card =
    '     <a class="portfolio-item d-block mx-auto" href="javascript:void(0)" onclick="verPatron(' +
    i +
    ');">';
  card +=
    '      <div class="portfolio-item-caption d-flex position-absolute h-100 w-100">';
  card +=
    '        <div class="portfolio-item-caption-content my-auto w-100 text-center text-white">';
  card += "          <h4>" + patron.nombre + "</h4>";
  card += '          <i class="fa fa-search-plus fa-3x"></i>';
  card += "        </div>";
  card += "      </div>";
  card +=
    '      <img class="img-fluid" src="' +
    patron.portafolio +
    '" width="100%" alt="">';
  card += "    </a>";
  card += "  </div>";
  div.innerHTML = card;
  contenerdor.append(div);
}

function verPatron(pos) {
  console.log(data[pos]);
  const tipo = document.getElementById("tipo");
  const resumen = document.getElementById("resumen");
  tipo.innerHTML = data[pos].tipo;
  resumen.innerHTML = data[pos].resumen;
  const participantes = data[pos].participantes;
  document.getElementById("nombre").innerHTML = data[pos].nombre;
  document.getElementById("participantes").innerHTML = "";
  document.getElementById("logo").src = data[pos].logo;
  document.getElementById("diagrama_c").src = data[pos].portafolio;
  document.getElementById("diagrama_s").src = data[pos].logo;
  for (let i = 0; i < participantes.length; i++) {
    const liP = document.createElement("li");
    // liP.classList.add("fa", "fa-1x", "fa-star")
    liP.innerHTML = participantes[i];
    document.getElementById("participantes").appendChild(liP);
  }
  $("#myModal3").modal({
    backdrop: "static"
  });
}

// '<div class="col-6 col-md-4 col-lg-4"><a class="portfolio-item d-block mx-auto" href="#portfolio-modal-2">           <div class="portfolio-item-caption d-flex position-absolute h-100 w-100">             <div class="portfolio-item-caption-content my-auto w-100 text-center text-white">               <h4>Patrón Decorator</h4>               <i class="fa fa-search-plus fa-3x"></i>             </div>           </div>           <img class="img-fluid" src="img/patrones/decorator.svg" width="100%" alt="">         </a>       </div>'
// $(".pss").append('<div class="col-6 col-md-4 col-lg-4"><a class="portfolio-item d-block mx-auto" href="#" href="javascript:void(0)" onclick="ver();">           <div class="portfolio-item-caption d-flex position-absolute h-100 w-100">             <div class="portfolio-item-caption-content my-auto w-100 text-center text-white">               <h4>Patrón Decorator</h4>               <i class="fa fa-search-plus fa-3x"></i>             </div>           </div>           <img class="img-fluid" src="img/patrones/decorator.svg" width="100%" alt="">         </a>       </div>');