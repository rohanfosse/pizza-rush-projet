/**
 * Étape 2 : les algorithmes.
 *
 * Six fonctions. Aucune ne modifie ce qu'on lui donne.
 *
 * Vocabulaire :
 *   un quartier  {largeur, hauteur, pizzeria: {x, y}, plan: [chaînes]}
 *                plan[y][x] vaut "." (rue) ou "#" (immeuble)
 *   un chemin    une liste de positions à parcourir, SANS la case de départ,
 *                AVEC la case d'arrivée
 *
 * La méthode est décrite en section 8 du sujet. Les tests qui vont avec :
 * tests/test_2_algos.js
 */

/** La clé texte d'une position : {x: 3, y: 7} donne "3,7". */
export function cle(position) {
  // TODO etape 2 : ecrire cle
  throw new Error("etape 2 : cle");
}

/** Vrai si la position est dans la carte et n'est pas un immeuble. */
export function estLibre(quartier, position) {
  // TODO etape 2 : ecrire estLibre
  throw new Error("etape 2 : estLibre");
}

/**
 * Les cases libres adjacentes, sans les diagonales, dans cet ordre exact :
 * haut, droite, bas, gauche.
 */
export function voisins(quartier, position) {
  // TODO etape 2 : ecrire voisins
  throw new Error("etape 2 : voisins");
}

/**
 * Le plus court chemin de depart à arrivee, par un parcours en largeur (BFS).
 *
 * Renvoie :
 *   une liste de positions   sans le départ, avec l'arrivée
 *   []                       si départ et arrivée sont la même case
 *   null                     si l'une des deux est bloquée ou hors carte,
 *                            ou s'il n'existe aucun chemin
 *
 * À écrire aussi : la complexité de votre fonction, en commentaire juste
 * au-dessus de cette ligne, avec la phrase qui la justifie.
 */
export function plusCourtChemin(quartier, depart, arrivee) {
  // TODO etape 2 : ecrire plusCourtChemin
  throw new Error("etape 2 : plusCourtChemin");
}

/**
 * Le chemin complet d'une livraison : de la position du coursier à la
 * pizzeria, puis de la pizzeria au client, les deux morceaux mis bout à bout.
 * null si l'un des deux morceaux est impossible.
 */
export function itineraire(quartier, coursier, commande) {
  // TODO etape 2 : ecrire itineraire
  throw new Error("etape 2 : itineraire");
}

/**
 * Le coursier qui part livrer cette commande : parmi les coursiers libres qui
 * peuvent atteindre le client, celui dont l'itinéraire compte le moins de
 * cases. À distance égale, le premier nom dans l'ordre alphabétique.
 * null s'il n'y a personne.
 */
export function coursierLePlusProche(coursiers, commande, quartier) {
  // TODO etape 2 : ecrire coursierLePlusProche
  throw new Error("etape 2 : coursierLePlusProche");
}
