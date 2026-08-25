/**
 * Lance les tests dans Node : `npm test` ou `node tests/lancer-node.js`.
 * Fourni. La même liste de fichiers est importée par tests.html.
 */

import { lancer, decrireErreur } from "./mini.js";
import "./test_1_modeles.js";
import "./test_2_algos.js";
import "./test_3_jeu.js";
import "./test_4_les_votres.js";

const VERT = "\x1b[32m";
const ROUGE = "\x1b[31m";
const GRIS = "\x1b[90m";
const FIN = "\x1b[0m";

let derniereSuite = null;
const rapport = await lancer((r) => {
  if (r.suite !== derniereSuite) {
    console.log("\n" + r.suite);
    derniereSuite = r.suite;
  }
  if (r.ok) {
    console.log(`  ${VERT}ok${FIN}  ${r.nom}`);
  } else {
    console.log(`  ${ROUGE}KO${FIN}  ${r.nom}`);
    console.log(`      ${GRIS}${decrireErreur(r.erreur)}${FIN}`);
  }
});

const tous = rapport.flatMap((s) => s.resultats);
const rates = tous.filter((r) => !r.ok).length;
console.log();
if (rates === 0) {
  console.log(`${VERT}${tous.length} tests, tout est vert.${FIN}`);
} else {
  console.log(`${ROUGE}${rates} rate(s)${FIN} sur ${tous.length}.`);
  const premier = tous.find((r) => !r.ok);
  console.log(`Prochaine chose a faire : ${decrireErreur(premier.erreur)}`);
}
process.exitCode = rates === 0 ? 0 : 1;
