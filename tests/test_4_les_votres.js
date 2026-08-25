/**
 * Étape 4 : vos tests.
 *
 * Écrivez ici AU MOINS DEUX tests à vous, sur des comportements que les tests
 * fournis ne couvrent pas. Les imports dont vous pouvez avoir besoin sont
 * déjà en place ci-dessous.
 *
 * Un bon test porte sur un seul comportement, tient en quelques lignes, et
 * son nom énonce ce qu'il vérifie. Vérifiez qu'il est utile en cassant
 * volontairement votre code une minute : il doit passer au rouge.
 *
 * Les assertions disponibles (voir tests/mini.js) :
 *   assert.ok(valeur)                     assert.equal(obtenu, attendu)
 *   assert.notEqual(obtenu, attendu)      assert.deepEqual(obtenu, attendu)
 *   assert.throws(fn, /motif/)            await assert.rejects(promesse, /motif/)
 *
 * Voir la section 10 de SUJET.md.
 */

import { suite, test, assert } from "./mini.js";
import { Commande, Coursier, Velo, Scooter } from "../src/modeles.js";
import { cle, estLibre, voisins, plusCourtChemin, itineraire, coursierLePlusProche } from "../src/algos.js";
import { Partie } from "../src/jeu.js";

suite("etape 4 : vos tests");

// Des idées de cas limites, si vous en manquez :
//
//   - un coursier dont le chemin fait exactement `vitesse` cases arrive en un
//     seul avancer() ;
//   - plusCourtChemin sur un quartier d'une seule case ;
//   - une commande dont la destination EST la pizzeria : que vaut le chemin ?
//   - une partie ou personne ne peut livrer : le score bouge-t-il ?
//   - une commande livree tres en retard : les points tombent-ils bien a zero
//     sans devenir negatifs ?
//   - deux coursiers a la meme distance : lequel part ?

// Le modèle, à décommenter et à adapter :
//
// test("un coursier arrive en un coup si le chemin fait sa vitesse", () => {
//   const velo = new Velo("Ana", { x: 0, y: 0 });
//   velo.charger(new Commande(1, { x: 2, y: 0 }, ["Reine"]), [{ x: 1, y: 0 }, { x: 2, y: 0 }]);
//   assert.equal(velo.avancer(), true);
// });

// TODO etape 4 : votre premier test

// TODO etape 4 : votre deuxieme test
