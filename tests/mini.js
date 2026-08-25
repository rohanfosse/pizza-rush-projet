/**
 * Un mini outil de test, fourni. Il tient en une page et tourne aussi bien
 * dans le navigateur (tests.html) que dans Node (npm test).
 *
 *   import { suite, test, assert } from "./mini.js";
 *
 *   suite("etape 1 : modeles");
 *   test("une commande compte ses pizzas", () => {
 *     assert.equal(new Commande(1, {x: 0, y: 0}, ["Reine"]).nbPizzas, 1);
 *   });
 *
 * Les assertions prennent d'abord ce qu'on a OBTENU, puis ce qu'on ATTENDAIT.
 */

const suites = [];
let courante = null;

export function suite(nom) {
  courante = { nom, tests: [] };
  suites.push(courante);
}

export function test(nom, fn) {
  if (courante === null) suite("(sans suite)");
  courante.tests.push({ nom, fn });
}

class EchecAssertion extends Error {
  constructor(message) {
    super(message);
    this.name = "EchecAssertion";
  }
}

function fmt(valeur) {
  if (valeur instanceof Error) return valeur.name + ": " + valeur.message;
  if (typeof valeur === "string") return JSON.stringify(valeur);
  if (valeur === undefined) return "undefined";
  try {
    return JSON.stringify(valeur);
  } catch {
    return String(valeur);
  }
}

// Met les clés des objets dans un ordre fixe pour pouvoir comparer deux
// structures via JSON.stringify sans dépendre de l'ordre d'insertion.
function normaliser(valeur) {
  if (Array.isArray(valeur)) return valeur.map(normaliser);
  if (valeur && typeof valeur === "object" && !(valeur instanceof Date)) {
    const plat = {};
    for (const k of Object.keys(valeur).sort()) plat[k] = normaliser(valeur[k]);
    return plat;
  }
  return valeur;
}

function echec(message) {
  throw new EchecAssertion(message);
}

export const assert = {
  ok(valeur, message) {
    if (!valeur) echec(message ?? "attendu une valeur vraie, obtenu " + fmt(valeur));
  },
  equal(obtenu, attendu, message) {
    if (!Object.is(obtenu, attendu)) {
      echec(message ?? "attendu " + fmt(attendu) + ", obtenu " + fmt(obtenu));
    }
  },
  notEqual(obtenu, attendu, message) {
    if (Object.is(obtenu, attendu)) echec(message ?? "attendu autre chose que " + fmt(attendu));
  },
  deepEqual(obtenu, attendu, message) {
    if (JSON.stringify(normaliser(obtenu)) !== JSON.stringify(normaliser(attendu))) {
      echec(message ?? "attendu " + fmt(attendu) + ", obtenu " + fmt(obtenu));
    }
  },
  /** Vérifie que fn lève une erreur ; `motif` (texte ou RegExp) doit apparaître dans le message. */
  throws(fn, motif, message) {
    let erreur = null;
    try {
      fn();
    } catch (e) {
      erreur = e;
    }
    if (erreur === null) echec(message ?? "une erreur etait attendue, rien n'a ete leve");
    if (motif !== undefined && !String(erreur.message).match(motif)) {
      echec("une erreur a ete levee mais son message ne contient pas " + fmt(motif) + " : " + fmt(erreur));
    }
    return erreur;
  },
  /** Pareil pour une promesse (ou une fonction async). */
  async rejects(promesse, motif, message) {
    let erreur = null;
    try {
      await (typeof promesse === "function" ? promesse() : promesse);
    } catch (e) {
      erreur = e;
    }
    if (erreur === null) echec(message ?? "un rejet etait attendu, la promesse a reussi");
    if (motif !== undefined && !String(erreur.message).match(motif)) {
      echec("un rejet a eu lieu mais son message ne contient pas " + fmt(motif) + " : " + fmt(erreur));
    }
    return erreur;
  },
};

/**
 * Lance tous les tests enregistrés. Renvoie, par suite, la liste des
 * résultats {nom, ok, erreur}. `surResultat` est appelé après chaque test.
 */
export async function lancer(surResultat = () => {}) {
  const rapport = [];
  for (const s of suites) {
    const resultats = [];
    for (const t of s.tests) {
      let ok = true;
      let erreur = null;
      try {
        await t.fn();
      } catch (e) {
        ok = false;
        erreur = e;
      }
      const resultat = { suite: s.nom, nom: t.nom, ok, erreur };
      resultats.push(resultat);
      surResultat(resultat);
    }
    rapport.push({ nom: s.nom, resultats });
  }
  return rapport;
}

/** Le message à montrer pour un test raté. */
export function decrireErreur(erreur) {
  if (erreur instanceof EchecAssertion) return erreur.message;
  return (erreur && erreur.name ? erreur.name + " : " : "") + (erreur && erreur.message ? erreur.message : String(erreur));
}
