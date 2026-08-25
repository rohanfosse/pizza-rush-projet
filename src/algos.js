/**
 * Étape 2 : les algorithmes.
 *
 * Tout ce qui réfléchit : se repérer sur la carte, trouver un chemin, choisir
 * le coursier qui part. Aucune de ces fonctions ne modifie ce qu'on lui
 * donne : elles reçoivent des données et renvoient un résultat.
 *
 * Vocabulaire :
 *   un quartier  est l'objet lu dans donnees/quartier.json :
 *                {largeur, hauteur, pizzeria: {x, y}, plan: [chaînes]}
 *                plan[y][x] vaut "." (rue) ou "#" (immeuble)
 *   un chemin    est une liste de positions à parcourir, SANS la case de
 *                départ, AVEC la case d'arrivée
 *
 * Le test qui va avec : tests/test_2_algos.js
 */

/**
 * La clé texte d'une position, "x,y".
 *
 * Pourquoi : deux objets {x: 1, y: 2} différents ne sont jamais égaux pour
 * un Set ou une Map (ce sont deux objets distincts en mémoire), alors que
 * deux chaînes "1,2" le sont. On passe donc par une clé texte pour savoir
 * si une case a déjà été visitée.
 */
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
 * Les cases libres adjacentes (pas de diagonale), dans l'ordre :
 * haut, droite, bas, gauche.
 */
export function voisins(quartier, position) {
  // TODO etape 2 : ecrire voisins
  throw new Error("etape 2 : voisins");
}

/**
 * Le plus court chemin de depart à arrivee, par un parcours en largeur (BFS).
 *
 * Le principe : on explore les cases par cercles concentriques autour du
 * départ. On garde dans une file (un tableau, où l'on ajoute à la fin avec
 * push et où l'on retire au début avec shift) les cases à explorer, et dans
 * une Map la case par laquelle on est arrivé sur chaque case déjà vue. Dès
 * qu'on touche l'arrivée, on remonte cette Map à l'envers pour reconstruire
 * le chemin, qu'on retourne à la fin. Comme on explore par cercles, le
 * premier chemin trouvé est forcément le plus court.
 *
 * Renvoie une liste de positions (sans le départ, avec l'arrivée), [] si
 * départ et arrivée sont la même case, null si l'une des deux est bloquée
 * ou si aucun chemin n'existe.
 *
 * Complexité : chaque case est visitée au plus une fois, donc
 * O(largeur x hauteur). Écrivez-la en commentaire quand vous aurez fini.
 */
export function plusCourtChemin(quartier, depart, arrivee) {
  // TODO etape 2 : ecrire plusCourtChemin
  throw new Error("etape 2 : plusCourtChemin");
}

/**
 * Le chemin complet d'une livraison : de la position du coursier à la
 * pizzeria (on charge les pizzas), puis de la pizzeria au client.
 * Les deux morceaux mis bout à bout. null si l'un des deux est impossible.
 */
export function itineraire(quartier, coursier, commande) {
  // TODO etape 2 : ecrire itineraire
  throw new Error("etape 2 : itineraire");
}

/**
 * Le coursier qui va livrer cette commande : parmi les coursiers libres qui
 * peuvent atteindre le client, celui dont l'itinéraire compte le moins de
 * cases. À distance égale, le nom qui vient en premier dans l'ordre
 * alphabétique (voir String.prototype.localeCompare), pour que deux parties
 * identiques se déroulent toujours pareil. null s'il n'y a personne.
 */
export function coursierLePlusProche(coursiers, commande, quartier) {
  // TODO etape 2 : ecrire coursierLePlusProche
  throw new Error("etape 2 : coursierLePlusProche");
}
