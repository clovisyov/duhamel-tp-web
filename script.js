/* ==========================================
   0 h 47 : bonus JavaScript
   Le jeu fonctionne sans ce fichier : il ajoute
   seulement le compteur de fins et les sons.
   ========================================== */

const page = document.body;
const barre = document.querySelector(".barre");
const scene = document.querySelector(".scene");
const estAccueil = page.hasAttribute("data-depart");
const racine = estAccueil ? "" : "../";

/* ---------- 1. Les fins découvertes (score) ---------- */
/* La liste est gardée dans le navigateur, d'une partie à l'autre. */
const nomsDesFins = ["mauvais-arret", "passager", "conducteur", "retour"];

let fins = [];
try {
  fins = JSON.parse(localStorage.getItem("fins")) || [];
} catch (erreur) {
  fins = [];
}

function noterFin(nom) {
  if (nomsDesFins.includes(nom) && !fins.includes(nom)) {
    fins.push(nom);
    try {
      localStorage.setItem("fins", JSON.stringify(fins));
    } catch (erreur) {
      /* mémoire indisponible : la fin n'est pas retenue */
    }
  }
}

/* Sur une page de fin : on note la fin, et on la transmet aussi à l'accueil
   dans l'adresse du bouton "Recommencer" (index.html?fin=retour).
   Certains navigateurs ne partagent pas leur mémoire entre deux fichiers
   ouverts par double-clic : l'adresse sert alors de relais. */
const fin = page.dataset.fin;
if (fin) {
  noterFin(fin);
  const recommencer = document.querySelector(".choice");
  recommencer.href = recommencer.href + "?fin=" + fin;
}

if (estAccueil) {
  noterFin(new URLSearchParams(location.search).get("fin"));

  const compteur = document.createElement("p");
  compteur.className = "fins";
  compteur.textContent = "Fins découvertes : " + fins.length + " / 4";
  scene.append(compteur);
}

/* ---------- 2. Les sons ---------- */
/* Une ambiance en boucle, plus un bruitage propre à chaque page.
   Le nom du bruitage est écrit dans la page : <body data-son="reveil"> */
const ambiance = new Audio(racine + "assets/sounds/ambiance.mp3");
ambiance.loop = true;
ambiance.volume = 0.35;

const bruitage = new Audio(racine + "assets/sounds/" + page.dataset.son + ".mp3");
bruitage.volume = 0.9;
let bruitageJoue = false;

const boutonSon = document.createElement("button");
boutonSon.type = "button";
boutonSon.className = "son";
barre.append(boutonSon);

/* Le son est activé par défaut, sauf si le joueur l'a coupé */
function sonVoulu() {
  return sessionStorage.getItem("son") !== "non";
}

function afficherSon() {
  boutonSon.textContent = sonVoulu() ? "Son : activé" : "Son : coupé";
}

function lancerSons() {
  if (!sonVoulu()) {
    return;
  }
  ambiance.play()
    .then(function () {
      if (!sonVoulu()) {
        ambiance.pause();
        return;
      }
      if (!bruitageJoue) {
        bruitageJoue = true;
        bruitage.play();
      }
    })
    .catch(function () {
      /* Le navigateur bloque le son tant que le joueur n'a rien fait :
         on réessaie à son premier clic ou à sa première touche. */
      document.addEventListener("pointerdown", lancerSons, { once: true });
      document.addEventListener("keydown", lancerSons, { once: true });
    });
}

boutonSon.addEventListener("click", function () {
  if (sonVoulu()) {
    sessionStorage.setItem("son", "non");
    ambiance.pause();
    bruitage.pause();
  } else {
    sessionStorage.setItem("son", "oui");
    lancerSons();
  }
  afficherSon();
});

/* L'ambiance reprend là où elle s'était arrêtée sur la page précédente */
ambiance.currentTime = Number(sessionStorage.getItem("position")) || 0;
afficherSon();
lancerSons();

window.addEventListener("pagehide", function () {
  sessionStorage.setItem("position", ambiance.currentTime);
});