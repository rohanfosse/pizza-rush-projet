/**
 * Étape 1 : les modèles.
 *
 * Ce qui existe dans le jeu : des commandes et des coursiers. Rien ici ne
 * connaît l'écran ni la carte : ce sont des objets simples, faciles à tester.
 *
 * Vocabulaire :
 *   une position  est un objet {x, y} (x = colonne, y = ligne, depuis 0)
 *   un chemin     est une liste de positions à parcourir
 *
 * Règle de l'atelier : un constructeur vérifie ce qu'on lui donne et lève
 * une Error avec un message lisible si ça ne va pas.
 *
 * Le test qui va avec : tests/test_1_modeles.js
 */

/** Vrai si `position` est bien un {x, y} avec deux entiers positifs. Fournie. */
export function estUnePosition(position) {
  return (
    position !== null &&
    typeof position === "object" &&
    Number.isInteger(position.x) &&
    Number.isInteger(position.y) &&
    position.x >= 0 &&
    position.y >= 0
  );
}

export class Commande {
  /**
   * id           entier strictement positif
   * destination  une position {x, y}
   * pizzas       tableau non vide de noms de pizzas
   * creeeAu      le tour où la commande est arrivée (0 par défaut)
   *
   * Range tout ça dans this.id, this.destination, this.pizzas, this.creeeAu,
   * et met this.livreeAu à null (elle n'est pas encore livrée).
   *
   * La destination et la liste de pizzas sont COPIÉES : modifier ce qu'on a
   * passé au constructeur ne doit pas modifier la commande.
   * Lève une Error si l'id, la destination ou la liste de pizzas ne va pas.
   */
  constructor(id, destination, pizzas, creeeAu = 0) {
    // TODO etape 1 : ecrire le constructeur de Commande
    throw new Error("etape 1 : le constructeur de Commande");
  }

  /** Le nombre de pizzas de la commande. */
  get nbPizzas() {
    // TODO etape 1 : ecrire Commande.nbPizzas
    throw new Error("etape 1 : Commande.nbPizzas");
  }

  /** Par exemple : "Commande #3 : 2 pizzas pour (4, 7)" (et "1 pizza" au singulier). */
  toString() {
    // TODO etape 1 : ecrire Commande.toString
    throw new Error("etape 1 : Commande.toString");
  }
}

export class Coursier {
  /**
   * nom       chaîne non vide
   * position  une position {x, y}, copiée
   *
   * Range this.nom et this.position. Au départ un coursier n'a pas de
   * commande (this.commande vaut null) et son chemin est vide (this.chemin
   * vaut []). Lève une Error si le nom ou la position ne va pas.
   */
  constructor(nom, position) {
    // TODO etape 1 : ecrire le constructeur de Coursier
    throw new Error("etape 1 : le constructeur de Coursier");
  }

  // Ces trois valeurs sont ce que les sous-classes redéfinissent : c'est tout
  // l'intérêt de l'héritage ici. Un coursier de base va à pied.
  get type() {
    return "coursier";
  }
  /** Nombre de cases parcourues par tour. */
  get vitesse() {
    return 1;
  }
  /** La lettre affichée sur la carte. */
  get symbole() {
    return "C";
  }

  /** Vrai s'il n'a pas de commande en cours. */
  get estLibre() {
    // TODO etape 1 : ecrire Coursier.estLibre
    throw new Error("etape 1 : Coursier.estLibre");
  }

  /**
   * Confie une commande et le chemin à suivre (liste de positions, copiée).
   * Lève une Error si le coursier livre déjà (message contenant "deja").
   */
  charger(commande, chemin) {
    // TODO etape 1 : ecrire Coursier.charger
    throw new Error("etape 1 : Coursier.charger");
  }

  /**
   * Avance d'au plus `vitesse` cases le long du chemin : chaque case
   * parcourue devient la nouvelle position et sort du chemin.
   * Renvoie vrai si le chemin est terminé après ce déplacement (le coursier
   * est arrivé), faux sinon. Un coursier libre ne bouge pas et renvoie faux.
   */
  avancer() {
    // TODO etape 1 : ecrire Coursier.avancer
    throw new Error("etape 1 : Coursier.avancer");
  }

  /**
   * Remet la commande au client : le coursier redevient libre et la commande
   * est renvoyée. Lève une Error s'il n'y a rien à livrer (message contenant
   * "rien") ou si le chemin n'est pas terminé (message contenant "arrive").
   */
  livrer() {
    // TODO etape 1 : ecrire Coursier.livrer
    throw new Error("etape 1 : Coursier.livrer");
  }

  /** Par exemple : "Ana (velo) en (1, 1)". */
  toString() {
    // TODO etape 1 : ecrire Coursier.toString
    throw new Error("etape 1 : Coursier.toString");
  }
}

/**
 * Deux cases par tour. Type "velo", lettre "V" sur la carte.
 *
 * Tout le reste (constructeur, charger, avancer, livrer) est hérité de
 * Coursier : il n'y a rien à réécrire, seulement les trois accesseurs à
 * redéfinir.
 */
export class Velo extends Coursier {
  // TODO etape 1 : redefinir les trois accesseurs, et rien d'autre.
  // type "velo", vitesse 2, symbole "V".
  // charger, avancer et livrer sont herites de Coursier : ne les reecrivez pas.
}

/** Trois cases par tour. Type "scooter", lettre "S" sur la carte. */
export class Scooter extends Coursier {
  // TODO etape 1 : meme travail que pour Velo.
  // type "scooter", vitesse 3, symbole "S".
}
