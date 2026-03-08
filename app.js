const categorias={

"ACEITES COMESTIBLES":{primera:90,segunda:60,tercera:30},
"GRANOS Y SEMILLAS":{primera:90,segunda:60,tercera:30},
"DULCERIA":{primera:45,segunda:30,tercera:15},
"CHOCOLATES":{primera:45,segunda:30,tercera:15},
"CEREALES":{primera:40,segunda:29,tercera:14},
"GALLETAS":{primera:40,segunda:29,tercera:14},
"BOTANAS 1":{primera:29,segunda:14,tercera:5},
"BOTANAS 2":{primera:29,segunda:14,tercera:5},
"REFRESCOS":{primera:15,segunda:9,tercera:5},
"QUESOS":{primera:10,segunda:5,tercera:2},
"YOGHURT":{primera:10,segunda:5,tercera:2},
"SALCHICHAS":{primera:14,segunda:9,tercera:5},
"JAMONES":{primera:15,segunda:9,tercera:5}

};


window.onload=function(){

const select=document.getElementById("categoria");

for(let cat in categorias){

let option=document.createElement("option");

option.value=cat;
option.textContent=cat;

select.appendChild(option);

}

}


function agregarProducto(){

const codigo=document.getElementById("codigo").value;
const producto=document.getElementById("producto").value;
const piezas=document.getElementById("piezas").value;
const lote=document.getElementById("lote").value;
const categoria=document.getElementById("categoria").value;
const caducidad=document.getElementById("caducidad").value;

if(!codigo||!producto||!piezas||!lote||!categoria||!caducidad){

alert("Completa todos los campos");
return;

}

const hoy=new Date();
const fechaCad=new Date(caducidad);

const dias=Math.ceil((fechaCad-hoy)/(1000*60*60*24));

const regla=categorias[categoria];

if(dias>regla.primera){

alert("Aún no corresponde capturar");
return;

}

let etapa="";
let estado="";
let color="";

if(dias<=regla.primera && dias>regla.segunda){

etapa="1ra etapa";
estado="Bien";
color="#d4edda";

}else if(dias<=regla.segunda && dias>regla.tercera){

etapa="2da etapa";
estado="Regular";
color="#fff3cd";

}else{

etapa="3ra etapa";
estado="Mal";
color="#f8d7da";

}

const tabla=document.querySelector("#tabla tbody");

const fila=tabla.insertRow();

fila.style.background=color;

fila.innerHTML=`

<td>${codigo}</td>
<td>${producto}</td>
<td>${piezas}</td>
<td>${lote}</td>
<td>${dias}</td>
<td>${etapa}</td>
<td>${estado}</td>
<td><button onclick="eliminarProducto(this)">Eliminar</button></td>

`;

actualizarContador();
limpiar();

}


function eliminarProducto(btn){

btn.parentNode.parentNode.remove();

actualizarContador();

}


function actualizarContador(){

let bien=0;
let regular=0;
let mal=0;

document.querySelectorAll("#tabla tbody tr").forEach(fila=>{

let estado=fila.cells[6].innerText;

if(estado==="Bien")bien++;
if(estado==="Regular")regular++;
if(estado==="Mal")mal++;

});

document.getElementById("contadorBien").innerText=bien;
document.getElementById("contadorRegular").innerText=regular;
document.getElementById("contadorMal").innerText=mal;

}


function limpiar(){

document.getElementById("codigo").value="";
document.getElementById("producto").value="";
document.getElementById("piezas").value="";
document.getElementById("lote").value="";
document.getElementById("caducidad").value="";

}


function generarPDF(){

const { jsPDF }=window.jspdf;

const doc=new jsPDF();

doc.text("Reporte de Caducidades",20,20);

let y=40;

document.querySelectorAll("#tabla tbody tr").forEach(fila=>{

let texto="";

fila.querySelectorAll("td").forEach((col,i)=>{

if(i<7)texto+=col.innerText+" | ";

});

doc.text(texto,20,y);

y+=10;

});

doc.save("caducidades.pdf");

}