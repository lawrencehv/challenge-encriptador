const d = document;
const textArea = d.querySelector(".form__input");
const imagenMuneco = d.querySelector(".result__decrypted__img");
const loader = d.querySelector(".loader");
const resultadoTitulo = d.querySelector(".result__decrypted__container__title");
const resultadoText = d.querySelector(".result__decrypted__container__text");
const botonEncriptar = d.querySelector(".form__btn");
const botonDesencriptar = d.querySelectorAll(".form__btn");
const botonCopiar = d.querySelector(".form_btn--result");

const llaves = [
  ["e", "enter"],
  ["i", "imes"],
  ["a", "ai"],
  ["o", "ober"],
  ["u", "ufat"],
];


//Funcion para encriptar
function ecriptarmensaje(mensaje) {
  let mensajeEncriptado = "";
  for (let i = 0; i < mensaje.length; i++) {
    let letra = mensaje[i];
    let encriptada = letra;
    for (let j = 0; j < llaves.length; j++) {
      if (letra === llaves[j][0]) {
        encriptada = llaves[j][1]; 
        break;
      }
    }
    mensajeEncriptado += encriptada;
  }

  return mensajeEncriptado;
}
// funcion  para desencriptar
function desencriptarMensaje(mensaje) {
  let mensajeDesencriptado = mensaje;
  for (let i = 0; i < llaves.length; i++) {
    let regex = new RegExp(llaves[i][1], "g");
    mensajeDesencriptado = mensajeDesencriptado.replace(regex, llaves[i][0]); 
  }
  return mensajeDesencriptado;
}


textArea.addEventListener("input", (e) => {
    imagenMuneco.style.display = "none";
    loader.classList.remove("hidden");
    resultadoTitulo.textContent = "Capturando Mensaje.";
    resultadoText.textContent = "";
});


botonEncriptar.addEventListener("click", (e) => {
    e.preventDefault();
    let mensaje = textArea.value.toLowerCase();
    let mensajeEncriptado = ecriptarmensaje(mensaje);
    resultadoText.textContent = mensajeEncriptado;
    botonCopiar.classList.remove("hidden");
    resultadoTitulo.textContent = "";
    loader.classList.add("hidden");
});


botonDesencriptar[1].addEventListener("click", (e) => {
    e.preventDefault();
    let mensaje = textArea.value.toLowerCase();
    let mensajeDesencriptado = desencriptarMensaje(mensaje);
    resultadoText.textContent = mensajeDesencriptado;
    resultadoTitulo.textContent = "";
    loader.classList.add("hidden");
    botonCopiar.classList.remove("hidden");
});


botonCopiar.addEventListener('click', ()=>{
    let textoCopiado = resultadoText.textContent;
    navigator.clipboard.writeText(textoCopiado).then(()=> {
        loader.classList.add("hidden");
        resultadoTitulo.textContent = "El texto se copió";
        botonCopiar.classList.add("hidden");
        resultadoText.textContent = ""
    })
});