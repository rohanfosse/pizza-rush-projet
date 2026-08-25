/**
 * Étape 1 : les modèles.
 *
 * Les objets du jeu : une commande, un coursier, et deux types de coursiers.
 * Rien ici ne connaît la carte ni l'écran.
 *
 * Vocabulaire :
 *   une position  un objet {x, y}, x = colonne, y = ligne, depuis 0
 *   un chemin     une liste de positions à parcourir
 *
 * Les détails sont en section 7 du sujet. Les tests qui vont avec :
 * tests/test_1_modeles.js
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
   * destination  une position {x, y}, COPIÉE
   * pizzas       tableau non vide de noms de pizzas, COPIÉ
   * creeeAu      le tour d'arrivée de la commande, 0 par défaut
   *
   * Range aussi this.livreeAu à null : elle n'est pas encore livrée.
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

  /** Exactement : "Commande #3 : 2 pizzas pour (4, 7)", et "1 pizza" au singulier. */
  toString() {
    // TODO etape 1 : ecrire Commande.toString
    throw new Error("etape 1 : Commande.toString");
  }
}

export class Coursier {
  /**
   * nom       chaîne non vide
   * position  une position {x, y}, COPIÉE
   *
   * Au départ, this.commande vaut null et this.chemin vaut [].
   * Lève une Error si le nom ou la position ne va pas.
   */
  constructor(nom, position) {
    // TODO etape 1 : ecrire le constructeur de Coursier
    throw new Error("etape 1 : le constructeur de Coursier");
  }

  // Les trois valeurs que les sous-classes redéfinissent.
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
   * Confie une commande et le chemin à suivre, COPIÉ.
   * Lève une Error si le coursier livre déjà, message contenant "deja".
   */
  charger(commande, chemin) {
    // TODO etape 1 : ecrire Coursier.charger
    throw new Error("etape 1 : Coursier.charger");
  }

  /**
   * Avance d'au plus `vitesse` cases le long du chemin. Chaque case parcourue
   * devient la nouvelle position et sort du chemin.
   * Renvoie vrai si le chemin est vide après ce déplacement, faux sinon.
   * Un coursier libre ne bouge pas et renvoie faux.
   */
  avancer() {
    // TODO etape 1 : ecrire Coursier.avancer
    throw new Error("etape 1 : Coursier.avancer");
  }

  /**
   * Rend la commande au client, redevient libre, et renvoie cette commande.
   * Lève une Error s'il n'y a rien à livrer, message contenant "rien", ou si
   * le chemin n'est pas terminé, message contenant "arrive".
   */
  livrer() {
    // TODO etape 1 : ecrire Coursier.livrer
    throw new Error("etape 1 : Coursier.livrer");
  }

  /** Exactement : "Ana (velo) en (1, 1)". */
  toString() {
    // TODO etape 1 : ecrire Coursier.toString
    throw new Error("etape 1 : Coursier.toString");
  }
}

export class Velo extends Coursier {
  // TODO etape 1 : type "velo", vitesse 2, symbole "V".
}

export class Scooter extends Coursier {
  // TODO etape 1 : type "scooter", vitesse 3, symbole "S".
}
