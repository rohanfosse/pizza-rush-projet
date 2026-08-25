import { suite, test, assert } from "./mini.js";
import { cle, estLibre, voisins, plusCourtChemin, itineraire, coursierLePlusProche } from "../src/algos.js";
import { Commande, Velo, Scooter } from "../src/modeles.js";

suite("etape 2 : algos");

// Un petit quartier de test. La pizzeria est en haut a gauche.
//
//     x 0 1 2 3 4
//   y 0 . . . . .
//     1 . # # # .
//     2 . # . . .
//     3 . . . . .
const Q = {
  largeur: 5,
  hauteur: 4,
  pizzeria: { x: 0, y: 0 },
  plan: [".....", ".###.", ".#...", "....."],
};

// Un quartier ou le bas est coupe du haut.
const COUPE = {
  largeur: 3,
  hauteur: 3,
  pizzeria: { x: 0, y: 0 },
  plan: [".#.", "###", "..."],
};

/** Vrai si chaque case du chemin est libre et touche la precedente. */
function estUnCheminValide(quartier, depart, chemin) {
  let precedente = depart;
  for (const pos of chemin) {
    if (!estLibre(quartier, pos)) return false;
    if (Math.abs(pos.x - precedente.x) + Math.abs(pos.y - precedente.y) !== 1) return false;
    precedente = pos;
  }
  return true;
}

test("cle donne 'x,y'", () => {
  assert.equal(cle({ x: 3, y: 7 }), "3,7");
  assert.equal(cle({ x: 0, y: 0 }), "0,0");
});

test("estLibre : dans la carte et pas un immeuble", () => {
  assert.equal(estLibre(Q, { x: 0, y: 0 }), true);
  assert.equal(estLibre(Q, { x: 2, y: 2 }), true);
  assert.equal(estLibre(Q, { x: 1, y: 1 }), false, "un immeuble");
  assert.equal(estLibre(Q, { x: -1, y: 0 }), false, "hors carte a gauche");
  assert.equal(estLibre(Q, { x: 5, y: 0 }), false, "hors carte a droite");
  assert.equal(estLibre(Q, { x: 0, y: 4 }), false, "hors carte en bas");
});

test("voisins : haut, droite, bas, gauche, sans les cases bloquees ni hors carte", () => {
  assert.deepEqual(voisins(Q, { x: 0, y: 0 }), [
    { x: 1, y: 0 },
    { x: 0, y: 1 },
  ]);
  assert.deepEqual(voisins(Q, { x: 2, y: 2 }), [
    { x: 3, y: 2 },
    { x: 2, y: 3 },
  ]);
  assert.deepEqual(voisins(Q, { x: 2, y: 3 }), [
    { x: 2, y: 2 },
    { x: 3, y: 3 },
    { x: 1, y: 3 },
  ]);
});

test("plusCourtChemin en ligne droite", () => {
  assert.deepEqual(plusCourtChemin(Q, { x: 0, y: 0 }, { x: 4, y: 0 }), [
    { x: 1, y: 0 },
    { x: 2, y: 0 },
    { x: 3, y: 0 },
    { x: 4, y: 0 },
  ]);
});

test("plusCourtChemin contourne les immeubles par le plus court", () => {
  const depart = { x: 0, y: 0 };
  const chemin = plusCourtChemin(Q, depart, { x: 2, y: 2 });
  assert.notEqual(chemin, null);
  assert.equal(chemin.length, 6, "par le bas c'est 6 cases, par le haut ce serait 8");
  assert.ok(estUnCheminValide(Q, depart, chemin), "chaque pas doit etre sur une case libre adjacente");
  assert.deepEqual(chemin[chemin.length - 1], { x: 2, y: 2 }, "le chemin finit sur l'arrivee");
});

test("plusCourtChemin : meme case = chemin vide, cible bloquee ou inatteignable = null", () => {
  assert.deepEqual(plusCourtChemin(Q, { x: 2, y: 3 }, { x: 2, y: 3 }), []);
  assert.equal(plusCourtChemin(Q, { x: 0, y: 0 }, { x: 1, y: 1 }), null, "un immeuble");
  assert.equal(plusCourtChemin(Q, { x: 0, y: 0 }, { x: 9, y: 9 }), null, "hors carte");
  assert.equal(plusCourtChemin(COUPE, { x: 0, y: 0 }, { x: 0, y: 2 }), null, "de l'autre cote du mur");
});

test("plusCourtChemin ne modifie ni le quartier ni les positions recues", () => {
  const depart = { x: 0, y: 0 };
  const planAvant = JSON.stringify(Q.plan);
  plusCourtChemin(Q, depart, { x: 4, y: 3 });
  assert.equal(JSON.stringify(Q.plan), planAvant);
  assert.deepEqual(depart, { x: 0, y: 0 });
});

test("itineraire passe par la pizzeria avant d'aller chez le client", () => {
  const coursier = new Velo("Ana", { x: 4, y: 0 });
  const chemin = itineraire(Q, coursier, new Commande(1, { x: 0, y: 2 }, ["Reine"]));
  assert.notEqual(chemin, null);
  assert.equal(chemin.length, 6, "4 cases jusqu'a la pizzeria, puis 2 jusqu'au client");
  assert.deepEqual(chemin[3], { x: 0, y: 0 }, "on passe par la pizzeria");
  assert.deepEqual(chemin[5], { x: 0, y: 2 });
  assert.ok(estUnCheminValide(Q, coursier.position, chemin));
});

test("itineraire vaut null si un troncon est impossible", () => {
  const coursier = new Velo("Ana", { x: 0, y: 0 });
  assert.equal(itineraire(COUPE, coursier, new Commande(1, { x: 2, y: 2 }, ["Reine"])), null);
});

test("coursierLePlusProche : celui qui a le moins de cases a faire", () => {
  const ana = new Velo("Ana", { x: 4, y: 3 }); // loin de la pizzeria
  const bilal = new Scooter("Bilal", { x: 0, y: 0 }); // deja a la pizzeria
  const commande = new Commande(1, { x: 4, y: 0 }, ["Reine"]);
  assert.equal(coursierLePlusProche([ana, bilal], commande, Q), bilal);
  assert.equal(coursierLePlusProche([bilal, ana], commande, Q), bilal, "l'ordre de la liste ne compte pas");
});

test("coursierLePlusProche ignore les coursiers occupes", () => {
  const ana = new Velo("Ana", { x: 0, y: 0 });
  const bilal = new Scooter("Bilal", { x: 0, y: 0 });
  const commande = new Commande(1, { x: 4, y: 0 }, ["Reine"]);
  bilal.charger(new Commande(2, { x: 4, y: 0 }, ["Reine"]), [{ x: 1, y: 0 }]);
  assert.equal(coursierLePlusProche([ana, bilal], commande, Q), ana, "Bilal est occupe");
  ana.charger(commande, [{ x: 1, y: 0 }]);
  assert.equal(coursierLePlusProche([ana, bilal], commande, Q), null, "plus personne n'est libre");
});

test("coursierLePlusProche : a distance egale, l'ordre alphabetique des noms", () => {
  const zoe = new Velo("Zoe", { x: 0, y: 0 });
  const ana = new Velo("Ana", { x: 0, y: 0 });
  assert.equal(coursierLePlusProche([zoe, ana], new Commande(1, { x: 4, y: 0 }, ["Reine"]), Q), ana);
});

test("coursierLePlusProche vaut null si le client est inatteignable", () => {
  const ana = new Velo("Ana", { x: 0, y: 0 });
  assert.equal(coursierLePlusProche([ana], new Commande(1, { x: 1, y: 2 }, ["Reine"]), COUPE), null);
});
