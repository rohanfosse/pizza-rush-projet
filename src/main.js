/**
 * Le contrôleur. Fourni, rien à modifier pour finir le projet.
 *
 * Il fait le lien entre les trois autres morceaux : il charge les données
 * (jeu.js), fait avancer le modèle (Partie), et demande à la vue de se
 * redessiner. C'est le C de MVC.
 *
 * Tant qu'une de vos fonctions n'est pas écrite, la page affiche l'erreur
 * qu'elle lève : c'est votre prochaine étape.
 */

import { chargerQuartier, chargerCommandes, Partie } from "./jeu.js";
import { Velo, Scooter } from "./modeles.js";
import { Vue } from "./vue.js";

const VITESSE_MS = 700;

const vue = new Vue(document.body);
const boutonJouer = document.querySelector("#jouer");
const boutonTour = document.querySelector("#un-tour");
const boutonRejouer = document.querySelector("#rejouer");

let partie = null;
let aVenir = [];
let minuteur = null;

function enPause() {
  return minuteur === null;
}

function majBoutons(finie = false) {
  boutonJouer.textContent = enPause() ? "Jouer" : "Pause";
  boutonJouer.disabled = finie;
  boutonTour.disabled = finie || !enPause();
}

/** Un tour de jeu : les commandes du moment arrivent, puis la partie avance. */
function tour() {
  const arrivees = aVenir.filter((c) => c.creeeAu <= partie.tick);
  aVenir = aVenir.filter((c) => c.creeeAu > partie.tick);
  for (const commande of arrivees) {
    try {
      partie.ajouterCommande(commande);
      vue.noter(`${commande} : ${commande.pizzas.join(", ")}`, "arrivee");
    } catch (erreur) {
      vue.noter(`Commande refusee : ${erreur.message}`, "erreur");
    }
  }

  const { affectations, livraisons } = partie.tour();
  for (const { coursier, commande } of affectations) {
    vue.noter(`${coursier.nom} part livrer la commande ${commande.id}`, "affectation");
  }
  for (const { coursier, commande, points } of livraisons) {
    vue.noter(`${coursier.nom} a livre la commande ${commande.id} : ${points} points`, "livraison");
  }
  vue.rafraichir(partie);

  if (aVenir.length === 0 && partie.enAttente.length === 0 && partie.resume.enCours === 0) {
    pause();
    majBoutons(true);
    vue.noter(`Service termine en ${partie.tick} tours. Score final : ${partie.score}.`, "fin");
  }
}

function jouer() {
  if (!enPause()) return;
  minuteur = setInterval(tour, VITESSE_MS);
  majBoutons();
}

function pause() {
  if (enPause()) return;
  clearInterval(minuteur);
  minuteur = null;
  majBoutons();
}

async function demarrer() {
  pause();
  vue.journal.replaceChildren();
  try {
    const quartier = await chargerQuartier("donnees/quartier.json");
    const commandes = await chargerCommandes("donnees/commandes.json");
    const coursiers = [
      new Velo("Ana", quartier.pizzeria),
      new Velo("Cheikh", quartier.pizzeria),
      new Scooter("Bilal", quartier.pizzeria),
    ];
    partie = new Partie(quartier, coursiers);
    aVenir = commandes;
    document.querySelector("#nom-quartier").textContent = quartier.nom;
    vue.dessinerQuartier(quartier);
    vue.rafraichir(partie);
    vue.noter(`${quartier.nom} : ${commandes.length} commandes au programme. Bon service.`, "fin");
    majBoutons();
  } catch (erreur) {
    vue.noter(erreur.message, "erreur");
    vue.noter("Le jeu s'arrete sur la premiere fonction qui manque : c'est votre prochaine etape.", "erreur");
    boutonJouer.disabled = true;
    boutonTour.disabled = true;
  }
}

boutonJouer.addEventListener("click", () => (enPause() ? jouer() : pause()));
boutonTour.addEventListener("click", tour);
boutonRejouer.addEventListener("click", demarrer);

demarrer();
