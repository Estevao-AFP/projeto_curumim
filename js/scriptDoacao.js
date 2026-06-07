document.addEventListener("DOMContentLoaded",()=>{

const tipoBtns =
document.querySelectorAll(".tipo-btn");

const destinoBtns =
document.querySelectorAll(".destino-card");

const areaValor =
document.getElementById("areaValor");

const areaPagamento =
document.getElementById("areaPagamento");

const resumo =
document.getElementById("resumoDoacao");

const botao =
document.getElementById("areaBotao");

const projeto =
document.getElementById("campoProjeto");

const material =
document.getElementById("campoMaterial");

const instrucoes =
document.getElementById("instrucoesMaterial");

const valor =
document.getElementById("valorDoacao");

const valorResumo =
document.getElementById("valorResumo");

let tipoAtual = "financeira";



/* -------- TIPO -------- */

tipoBtns.forEach(btn=>{

btn.addEventListener("click",()=>{

tipoBtns.forEach(x=>
x.classList.remove("active"));

btn.classList.add("active");

tipoAtual =
btn.dataset.tipo;



if(tipoAtual==="material"){

areaValor.classList.add("escondido");

areaPagamento.classList.add("escondido");

resumo.classList.add("escondido");

botao.classList.add("escondido");

material.classList.remove("escondido");

instrucoes.classList.remove("escondido");

}else{

areaValor.classList.remove("escondido");

areaPagamento.classList.remove("escondido");

resumo.classList.remove("escondido");

botao.classList.remove("escondido");

material.classList.add("escondido");

instrucoes.classList.add("escondido");

}

verificarProjeto();

});

});



/* -------- DESTINO -------- */

destinoBtns.forEach(btn=>{

btn.addEventListener("click",()=>{

destinoBtns.forEach(x=>
x.classList.remove("active"));

btn.classList.add("active");

verificarProjeto();

});

});



function verificarProjeto(){

const projetoSelecionado =

document.querySelector(
".destino-card.active"
).dataset.destino;



if(projetoSelecionado==="projeto"){

projeto.classList.remove(
"escondido"
);

}else{

projeto.classList.add(
"escondido"
);

}

}



/* -------- VALOR -------- */

valor.addEventListener("input",()=>{

let v =
parseFloat(valor.value);

if(isNaN(v)){

v=0;

}

valorResumo.innerText =

"R$ " +

v.toFixed(2);

});

});