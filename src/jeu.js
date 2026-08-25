/**
 * Étape 3 : le jeu. Charger les données, puis faire tourner la partie.
 *
 * Deux choses ici.
 *
 * 1. Le chargement des données, qui passe par le réseau. Un fichier posé à
 *    côté de la page se lit avec fetch, exactement comme on appellerait une
 *    API : une requête HTTP part, une réponse revient avec un code (200 =
 *    trouvé, 404 = pas trouvé, 500 = le serveur a un problème). On regarde
 *    toujours ce code avant de lire le contenu, et on ne fait jamais
 *    confiance à ce qu'on reçoit sans le vérifier.
 *
 * 2. La classe Partie, qui garde l'état du jeu et applique les règles. Au
 *    sens MVC, c'est le modèle : elle ne dessine rien et ne lit aucun
 *    fichier. La vue (vue.js) l'affiche, le contrôleur (main.js) la fait
 *    avancer. Les trois ne se mélangent pas.
 *
 * Le test qui va avec : tests/test_3_jeu.js
 */

import { coursierLePlusProche, itineraire, plusCourtChemin } from "./algos.js";
import { Commande } from "./modeles.js";

/**
 * Fait un GET sur l'URL et renvoie le JSON décodé.
 *
 * fetch renvoie une promesse : la fonction est `async`, et on attend le
 * résultat avec `await`. La réponse a une propriété `ok` (vraie pour un code
 * 2xx), une propriété `status` (le code), et une méthode `json()` qui décode
 * le corps, et qui renvoie elle aussi une promesse.
 *
 * Si `reponse.ok` est faux, lève une Error dont le message contient le code
 * ET l'URL, par exemple "HTTP 404 sur donnees/quartier.json".
 *
 * `fetchFn` permet de passer une autre fonction que le fetch du navigateur :
 * en jeu on ne la donne pas, dans les tests on en passe une fausse. C'est ce
 * qui rend cette fonction testable sans réseau.
 */
export async function chargerJson(url, fetchFn = fetch) {
  // TODO etape 3 : ecrire chargerJson
  throw new Error("etape 3 : chargerJson");
}

/**
 * Charge le quartier avec chargerJson et vérifie qu'il est cohérent avant de
 * le renvoyer. Lève une Error dont le message commence par
 * "quartier invalide : " si :
 *   - largeur ou hauteur n'est pas un entier strictement positif,
 *   - plan n'a pas exactement `hauteur` lignes,
 *   - une ligne du plan ne fait pas exactement `largeur` caractères,
 *   - la pizzeria n'a pas de coordonnées entières, est hors carte, ou est
 *     posée sur un immeuble.
 *
 * Pourquoi tout ça : un fichier peut avoir été mal édité, et un plan qui
 * ment sur ses dimensions ferait planter la carte bien plus loin, avec un
 * message incompréhensible. Mieux vaut refuser tout de suite, en disant quoi.
 */
export async function chargerQuartier(url, fetchFn = fetch) {
  // TODO etape 3 : ecrire chargerQuartier
  throw new Error("etape 3 : chargerQuartier");
}

/**
 * Charge le carnet de commandes et renvoie une liste d'instances de
 * Commande, pas les objets bruts du JSON, qui n'ont ni nbPizzas ni toString.
 */
export async function chargerCommandes(url, fetchFn = fetch) {
  // TODO etape 3 : ecrire chargerCommandes
  throw new Error("etape 3 : chargerCommandes");
}

export class Partie {
  /**
   * quartier   l'objet quartier
   * coursiers  une liste non vide de Coursier
   *
   * Au départ : this.tick à 0, this.score à 0, this.enAttente et
   * this.livrees à []. Lève une Error si le quartier manque ou si la liste
   * de coursiers est vide.
   */
  constructor(quartier, coursiers) {
    // TODO etape 3 : ecrire le constructeur de Partie
    throw new Error("etape 3 : le constructeur de Partie");
  }

  /**
   * Met une commande à la fin de la file d'attente : le premier arrivé est
   * le premier servi.
   *
   * Lève une Error si la destination est inaccessible depuis la pizzeria
   * (message contenant "inaccessible"). Dans ce cas la commande n'entre pas
   * dans la file : elle ne serait jamais livrée et la partie ne finirait
   * jamais.
   */
  ajouterCommande(commande) {
    // TODO etape 3 : ecrire Partie.ajouterCommande
    throw new Error("etape 3 : Partie.ajouterCommande");
  }

  /**
   * Parcourt la file d'attente dans l'ordre et confie chaque commande au
   * coursier libre le plus proche, avec son itinéraire. S'il n'y a plus
   * personne de libre, la commande reste dans la file pour le tour suivant.
   *
   * Renvoie la liste des affectations faites : [{coursier, commande}].
   */
  assigner() {
    // TODO etape 3 : ecrire Partie.assigner
    throw new Error("etape 3 : Partie.assigner");
  }

  /**
   * Un tour passe : this.tick augmente de 1. Chaque coursier en livraison
   * avance ; s'il arrive, il livre, la commande reçoit son tour de livraison
   * (livreeAu), les points s'ajoutent au score et la commande rejoint
   * this.livrees.
   *
   * Renvoie la liste des livraisons : [{coursier, commande, points}].
   */
  avancer() {
    // TODO etape 3 : ecrire Partie.avancer
    throw new Error("etape 3 : Partie.avancer");
  }

  /** Un tour complet : assigner puis avancer. Renvoie {affectations, livraisons}. */
  tour() {
    // TODO etape 3 : ecrire Partie.tour
    throw new Error("etape 3 : Partie.tour");
  }

  /**
   * Les points d'une commande livrée : (30 - délai) par pizza, jamais moins
   * de zéro. Le délai est livreeAu - creeeAu.
   */
  points(commande) {
    // TODO etape 3 : ecrire Partie.points
    throw new Error("etape 3 : Partie.points");
  }

  /** Un résumé simple pour l'affichage. Fourni. */
  get resume() {
    return {
      tick: this.tick,
      score: this.score,
      enAttente: this.enAttente.length,
      enCours: this.coursiers.filter((c) => !c.estLibre).length,
      livrees: this.livrees.length,
    };
  }
}
