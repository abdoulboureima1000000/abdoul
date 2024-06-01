const email = document.querySelector("#email");
const nom = document.querySelector("#nom");
const mot_de_passe = document.querySelector("#mot_de_passe");
const confirme_mot_de_passe = document.querySelector("#confirme_mot_de_passe");
const button = document.querySelector("button");
console.log(confirme_mot_de_passe);
console.log(email);

const span = document.createElement("span");
const loader = document.createElement("div");
span.appendChild(loader);
loader.classList.add("loader");

// gestion du nom

let name_gestion = false;
let email_gestion = false;
let gestion_mot_de_passe = false;
let gestion_confirme = false;

button.addEventListener("click", (event) => {
  event.preventDefault();

  const result = [
    name_gestion,
    email_gestion,
    gestion_mot_de_passe,
    gestion_confirme,
  ].every((e) => e === true);
  if (result) {
    button.innerText = "";
    button.appendChild(loader);
  }
  console.log([
    name_gestion,
    email_gestion,
    gestion_mot_de_passe,
    gestion_confirme,
  ]);
  console.log(result);
});

nom.addEventListener("input", (event) => {
  console.log(event);
  console.log(event.target.value.length);
  if (event.target.value.length > 8 && event.target.value.length <= 18) {
    name_gestion = true;
    console.log("ont rentre");
  } else {
    name_gestion = false;
  }
  console.log(name_gestion);
});

mot_de_passe.addEventListener("input", (event) => {
  console.log(event.target.value.length);
  if (event.target.value.length >= 8) {
    gestion_mot_de_passe = true;
    console.log(gestion_mot_de_passe);
  } else {
    gestion_mot_de_passe = false;
  }
  console.log(gestion_mot_de_passe);
  console.log(event.target.value);
});

confirme_mot_de_passe.addEventListener("input", (event) => {
  if (event.target.value === mot_de_passe.value && event.target.value !== "") {
    gestion_confirme = true;
  } else {
    gestion_confirme = false;
  }
  console.log(gestion_confirme);
});

email.addEventListener("input", (event) => {
  email.style.backgroundColor =
    event.target.value.length > 0 ? "white" : "#0a0a14";
  email.style.color = event.target.value.length > 0 ? "black" : "white";
  let config = "@gmail.com";
  email_gestion =
    event.target.value.slice(-config.length) === config ? true : false;
  console.log(email_gestion);
});
