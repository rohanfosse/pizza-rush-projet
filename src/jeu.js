/**
 * Étape 3 : charger les données, puis faire tourner la partie.
 *
 * Deux sujets dans ce fichier : les trois fonctions de chargement, qui passent
 * par le réseau, et la classe Partie, qui applique les règles du jeu.
 *
 * Partie ne dessine rien et ne lit aucun fichier : c'est le modèle. La vue
 * (vue.js) l'affiche, le contrôleur (main.js) la fait avancer.
 *
 * Les détails sont en section 9 du sujet. Les tests qui vont avec :
 * tests/test_3_jeu.js
 */

import { coursierLePlusProche, itineraire, plusCourtChemin } from "./algos.js";
import { Commande } from "./modeles.js";

/**
 * Fait un GET sur l'URL et renvoie le JSON décodé.
 *
 * Si la réponse n'est pas un succès, lève une Error dont le message contient
 * le code ET l'URL, par exemple "HTTP 404 sur donnees/quartier.json".
 *
 * `fetchFn` est la fonction de requête à utiliser. En jeu, personne ne la
 * passe et c'est le fetch du navigateur qui sert ; les tests en passent une
 * fausse, ce qui leur évite d'avoir besoin d'un serveur.
 */
export async function chargerJson(url, fetchFn = fetch) {
  // TODO etape 3 : ecrire chargerJson
  throw new Error("etape 3 : chargerJson");
}

/**
 * Charge le quartier et le renvoie seulement s'il est cohérent. Lève une Error
 * dont le message commence par "quartier invalide : " si :
 *   - largeur ou hauteur n'est pas un entier strictement positif,
 *   - plan n'a pas exactement `hauteur` lignes,
 *   - une ligne du plan ne fait pas exactement `largeur` caractères,
 *   - la pizzeria n'a pas de coordonnées entières, est hors carte, ou est
 *     posée sur un immeuble.
 */
export async function chargerQuartier(url, fetchFn = fetch) {
  // TODO etape 3 : ecrire chargerQuartier
  throw new Error("etape 3 : chargerQuartier");
}

/** Charge le carnet de commandes et renvoie une liste d'instances de Commande. */
export async function chargerCommandes(url, fetchFn = fetch) {
  // TODO etape 3 : ecrire chargerCommandes
  throw new Error("etape 3 : chargerCommandes");
}

export class Partie {
  /**
   * quartier   l'objet quartier
   * coursiers  une liste non vide de Coursier
   *
   * Au départ : this.tick à 0, this.score à 0, this.enAttente et this.livrees
   * à []. Lève une Error si le quartier manque ou si la liste est vide.
   */
  constructor(quartier, coursiers) {
    // TODO etape 3 : ecrire le constructeur de Partie
    throw new Error("etape 3 : le constructeur de Partie");
  }

  /**
   * Met la commande à la fin de la file d'attente : premier arrivé, premier
   * servi. Lève une Error, message contenant "inaccessible", si la destination
   * n'est pas atteignable depuis la pizzeria ; la commande n'entre alors pas
   * dans la file.
   */
  ajouterCommande(commande) {
    // TODO etape 3 : ecrire Partie.ajouterCommande
    throw new Error("etape 3 : Partie.ajouterCommande");
  }

  /**
   * Fait partir les coursiers : parcourt la file dans l'ordre et confie chaque
   * commande au coursier libre le plus proche, avec son itinéraire. Une
   * commande qui ne trouve personne reste dans la file.
   * Renvoie la liste des affectations faites : [{coursier, commande}].
   */
  assigner() {
    // TODO etape 3 : ecrire Partie.assigner
    throw new Error("etape 3 : Partie.assigner");
  }

  /**
   * Un tour passe : this.tick augmente de 1, les coursiers en route avancent,
   * ceux qui arrivent livrent. Une commande livrée reçoit son livreeAu, ses
   * points s'ajoutent au score, et elle rejoint this.livrees.
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
   * Les points d'une commande livrée : (30 - délai) par pizza, jamais moins de
   * zéro, avec délai = livreeAu - creeeAu.
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
