import { suite, test, assert } from "./mini.js";
import { chargerJson, chargerQuartier, chargerCommandes, Partie } from "../src/jeu.js";
import { Commande, Velo, Scooter } from "../src/modeles.js";

suite("etape 3 : jeu");

// ------------------------------------------------------- le chargement
// Aucun test ici ne touche au vrai reseau : on passe un faux fetch.

/** Un faux fetch qui repond toujours pareil et note ce qu'on lui a demande. */
function fauxFetch(status, corps) {
  const urls = [];
  const fn = async (url) => {
    urls.push(url);
    return new Response(JSON.stringify(corps), { status, headers: { "Content-Type": "application/json" } });
  };
  fn.urls = urls;
  return fn;
}

const QUARTIER_OK = { nom: "Test", largeur: 3, hauteur: 2, pizzeria: { x: 0, y: 0 }, plan: ["..#", "..."] };

test("chargerJson demande la bonne URL et renvoie le JSON decode", async () => {
  const fetchFn = fauxFetch(200, { pizzas: 3 });
  assert.deepEqual(await chargerJson("donnees/x.json", fetchFn), { pizzas: 3 });
  assert.deepEqual(fetchFn.urls, ["donnees/x.json"]);
});

test("chargerJson leve une Error avec le code quand la reponse n'est pas ok", async () => {
  await assert.rejects(chargerJson("nulle-part.json", fauxFetch(404, {})), /404/);
  await assert.rejects(chargerJson("nulle-part.json", fauxFetch(404, {})), /nulle-part\.json/);
  await assert.rejects(chargerJson("x.json", fauxFetch(500, {})), /500/);
});

test("chargerQuartier renvoie un quartier valide", async () => {
  assert.deepEqual(await chargerQuartier("q.json", fauxFetch(200, QUARTIER_OK)), QUARTIER_OK);
});

test("chargerQuartier refuse un plan qui n'a pas les bonnes dimensions", async () => {
  const tropCourt = { ...QUARTIER_OK, plan: ["..#"] };
  await assert.rejects(chargerQuartier("q.json", fauxFetch(200, tropCourt)), /quartier invalide/);
  const ligneTropLongue = { ...QUARTIER_OK, plan: ["..#.", "..."] };
  await assert.rejects(chargerQuartier("q.json", fauxFetch(200, ligneTropLongue)), /quartier invalide/);
  const sansTaille = { ...QUARTIER_OK, largeur: 0 };
  await assert.rejects(chargerQuartier("q.json", fauxFetch(200, sansTaille)), /quartier invalide/);
});

test("chargerQuartier refuse une pizzeria hors carte ou dans un immeuble", async () => {
  await assert.rejects(chargerQuartier("q.json", fauxFetch(200, { ...QUARTIER_OK, pizzeria: { x: 2, y: 0 } })), /invalide/);
  await assert.rejects(chargerQuartier("q.json", fauxFetch(200, { ...QUARTIER_OK, pizzeria: { x: 9, y: 0 } })), /invalide/);
});

test("chargerCommandes renvoie des instances de Commande", async () => {
  const brutes = [
    { id: 1, creeeAu: 2, destination: { x: 1, y: 1 }, pizzas: ["Reine"] },
    { id: 2, creeeAu: 5, destination: { x: 0, y: 1 }, pizzas: ["Vege", "Calzone"] },
  ];
  const commandes = await chargerCommandes("c.json", fauxFetch(200, brutes));
  assert.equal(commandes.length, 2);
  assert.ok(commandes[0] instanceof Commande, "des Commande, pas des objets bruts");
  assert.equal(commandes[0].creeeAu, 2);
  assert.equal(commandes[1].nbPizzas, 2);
});

// ------------------------------------------------------------ la partie

//     x 0 1 2 3 4
//   y 0 . . . . .
//     1 . # # # .
//     2 . . . . .
//     3 . . . . .
//     4 . . . . .
const Q = {
  nom: "Test",
  largeur: 5,
  hauteur: 5,
  pizzeria: { x: 0, y: 0 },
  plan: [".....", ".###.", ".....", ".....", "....."],
};

/** Une partie neuve : Ana en velo et Bob en scooter, tous deux a la pizzeria. */
function partieNeuve() {
  const ana = new Velo("Ana", { x: 0, y: 0 });
  const bob = new Scooter("Bob", { x: 0, y: 0 });
  return { partie: new Partie(Q, [ana, bob]), ana, bob };
}

test("une partie neuve : tour 0, score 0, rien en attente", () => {
  const { partie } = partieNeuve();
  assert.equal(partie.tick, 0);
  assert.equal(partie.score, 0);
  assert.deepEqual(partie.enAttente, []);
  assert.deepEqual(partie.livrees, []);
  assert.deepEqual(partie.resume, { tick: 0, score: 0, enAttente: 0, enCours: 0, livrees: 0 });
});

test("une partie exige un quartier et au moins un coursier", () => {
  assert.ok(partieNeuve().partie instanceof Partie, "un cas valide doit passer");
  assert.throws(() => new Partie(Q, []));
  assert.throws(() => new Partie(null, [new Velo("Ana", { x: 0, y: 0 })]));
});

test("ajouterCommande met en file dans l'ordre d'arrivee", () => {
  const { partie } = partieNeuve();
  partie.ajouterCommande(new Commande(1, { x: 4, y: 0 }, ["Reine"], 5));
  partie.ajouterCommande(new Commande(2, { x: 4, y: 0 }, ["Reine"], 6));
  partie.ajouterCommande(new Commande(3, { x: 4, y: 0 }, ["Reine", "Vege"], 7));
  assert.deepEqual(
    partie.enAttente.map((c) => c.id),
    [1, 2, 3],
  );
});

test("ajouterCommande refuse une destination inaccessible", () => {
  const { partie } = partieNeuve();
  assert.throws(() => partie.ajouterCommande(new Commande(1, { x: 1, y: 1 }, ["Reine"])), /inaccessible/, "un immeuble");
  assert.throws(() => partie.ajouterCommande(new Commande(2, { x: 9, y: 9 }, ["Reine"])), /inaccessible/, "hors carte");
  assert.deepEqual(partie.enAttente, []);
});

test("assigner confie la commande au coursier le plus proche, avec son itineraire", () => {
  const { partie, ana } = partieNeuve();
  const c = new Commande(1, { x: 4, y: 0 }, ["Reine"], 0);
  partie.ajouterCommande(c);
  const affectations = partie.assigner();
  assert.equal(affectations.length, 1);
  assert.equal(affectations[0].coursier, ana, "Ana et Bob sont a egale distance, Ana gagne par ordre alphabetique");
  assert.equal(affectations[0].commande, c);
  assert.equal(ana.commande, c);
  assert.equal(ana.chemin.length, 4);
  assert.deepEqual(partie.enAttente, []);
});

test("s'il n'y a plus de coursier libre, la commande reste en attente", () => {
  const { partie, ana, bob } = partieNeuve();
  bob.charger(new Commande(99, { x: 4, y: 0 }, ["Reine"]), [{ x: 1, y: 0 }]);
  partie.ajouterCommande(new Commande(1, { x: 4, y: 0 }, ["Reine"], 0));
  partie.ajouterCommande(new Commande(2, { x: 4, y: 4 }, ["Reine"], 0));
  const affectations = partie.assigner();
  assert.equal(affectations.length, 1, "il ne reste qu'Ana de libre");
  assert.equal(affectations[0].coursier, ana);
  assert.equal(affectations[0].commande.id, 1, "la premiere arrivee part la premiere");
  assert.deepEqual(
    partie.enAttente.map((c) => c.id),
    [2],
  );
});

test("avancer fait passer un tour, deplace les coursiers et livre a l'arrivee", () => {
  const { partie, ana } = partieNeuve();
  const c = new Commande(1, { x: 4, y: 0 }, ["Reine"], 0);
  partie.ajouterCommande(c);
  partie.assigner();

  let livraisons = partie.avancer();
  assert.equal(partie.tick, 1);
  assert.deepEqual(ana.position, { x: 2, y: 0 });
  assert.deepEqual(livraisons, [], "rien n'est encore livre");

  livraisons = partie.avancer();
  assert.equal(partie.tick, 2);
  assert.deepEqual(ana.position, { x: 4, y: 0 });
  assert.equal(livraisons.length, 1);
  assert.equal(livraisons[0].coursier, ana);
  assert.equal(livraisons[0].commande, c);
  assert.equal(livraisons[0].points, 28, "(30 - 2) x 1 pizza");
  assert.equal(c.livreeAu, 2);
  assert.equal(ana.estLibre, true);
  assert.equal(partie.score, 28);
  assert.deepEqual(partie.livrees, [c]);
});

test("points : (30 - delai) par pizza, jamais moins de zero", () => {
  const { partie } = partieNeuve();
  const rapide = new Commande(1, { x: 1, y: 0 }, ["Reine", "Vege"], 10);
  rapide.livreeAu = 14;
  assert.equal(partie.points(rapide), 52, "(30 - 4) x 2");
  const lente = new Commande(2, { x: 1, y: 0 }, ["Reine", "Vege"], 0);
  lente.livreeAu = 40;
  assert.equal(partie.points(lente), 0, "au-dela de 30 tours, la livraison ne rapporte plus rien");
});

test("tour = assigner puis avancer, et un coursier libere repart de la ou il est", () => {
  const { partie, ana, bob } = partieNeuve();
  partie.ajouterCommande(new Commande(1, { x: 4, y: 0 }, ["Reine"], 0));
  partie.tour();
  partie.tour(); // Ana livre en (4, 0)
  assert.equal(partie.livrees.length, 1);
  assert.equal(partie.score, 28);

  // Une commande en (0, 4) : Bob est a la pizzeria, Ana est loin en (4, 0).
  partie.ajouterCommande(new Commande(2, { x: 0, y: 4 }, ["Reine", "Vege"], 2));
  const { affectations } = partie.tour();
  assert.equal(affectations[0].coursier, bob, "Bob a 4 cases a faire, Ana en aurait 8");
  assert.equal(bob.chemin.length, 1, "Bob fait 3 cases par tour, il lui en reste une");

  // Ana est libre en (4, 0) : elle repart de la, en repassant par la pizzeria.
  partie.ajouterCommande(new Commande(3, { x: 4, y: 4 }, ["Reine"], 3));
  partie.tour();
  assert.equal(ana.commande.id, 3);
  assert.equal(bob.estLibre, true, "Bob a fini sa derniere case et livre");
  assert.equal(partie.livrees.length, 2);
  assert.equal(partie.score, 28 + 56, "(30 - 2) x 2 pizzas pour la commande de Bob");
  assert.equal(partie.resume.tick, 4);
  assert.equal(partie.resume.enCours, 1);
});
