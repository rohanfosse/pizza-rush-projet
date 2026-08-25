import { suite, test, assert } from "./mini.js";
import { Commande, Coursier, Velo, Scooter } from "../src/modeles.js";

suite("etape 1 : modeles");

// -------------------------------------------------------------- Commande

test("une commande garde ce qu'on lui donne", () => {
  const c = new Commande(3, { x: 4, y: 7 }, ["Reine", "Calzone"], 12);
  assert.equal(c.id, 3);
  assert.deepEqual(c.destination, { x: 4, y: 7 });
  assert.deepEqual(c.pizzas, ["Reine", "Calzone"]);
  assert.equal(c.creeeAu, 12);
  assert.equal(c.livreeAu, null);
});

test("creeeAu vaut 0 par defaut", () => {
  assert.equal(new Commande(1, { x: 0, y: 0 }, ["Reine"]).creeeAu, 0);
});

test("nbPizzas compte les pizzas", () => {
  assert.equal(new Commande(1, { x: 0, y: 0 }, ["Reine"]).nbPizzas, 1);
  assert.equal(new Commande(1, { x: 0, y: 0 }, ["Reine", "Vege", "Calzone"]).nbPizzas, 3);
});

test("une commande copie sa destination et ses pizzas", () => {
  const destination = { x: 1, y: 2 };
  const pizzas = ["Reine"];
  const c = new Commande(1, destination, pizzas);
  destination.x = 99;
  pizzas.push("Vege");
  assert.equal(c.destination.x, 1);
  assert.equal(c.nbPizzas, 1);
});

test("toString : 'Commande #3 : 2 pizzas pour (4, 7)'", () => {
  assert.equal(String(new Commande(3, { x: 4, y: 7 }, ["Reine", "Vege"])), "Commande #3 : 2 pizzas pour (4, 7)");
  assert.equal(String(new Commande(8, { x: 0, y: 1 }, ["Reine"])), "Commande #8 : 1 pizza pour (0, 1)");
});

test("une commande refuse un id, une destination ou des pizzas invalides", () => {
  assert.ok(new Commande(1, { x: 0, y: 0 }, ["Reine"]) instanceof Commande, "un cas valide doit passer");
  assert.throws(() => new Commande(0, { x: 0, y: 0 }, ["Reine"]));
  assert.throws(() => new Commande("3", { x: 0, y: 0 }, ["Reine"]));
  assert.throws(() => new Commande(1, { x: -1, y: 0 }, ["Reine"]));
  assert.throws(() => new Commande(1, null, ["Reine"]));
  assert.throws(() => new Commande(1, { x: 0, y: 0 }, []));
});

// -------------------------------------------------------------- Coursier

test("un coursier de base : vitesse 1, libre, sans chemin", () => {
  const c = new Coursier("Ana", { x: 1, y: 1 });
  assert.equal(c.nom, "Ana");
  assert.deepEqual(c.position, { x: 1, y: 1 });
  assert.equal(c.type, "coursier");
  assert.equal(c.vitesse, 1);
  assert.equal(c.estLibre, true);
  assert.equal(c.commande, null);
  assert.deepEqual(c.chemin, []);
});

test("un coursier refuse un nom vide ou une position invalide", () => {
  assert.ok(new Coursier("Ana", { x: 0, y: 0 }) instanceof Coursier, "un cas valide doit passer");
  assert.throws(() => new Coursier("", { x: 0, y: 0 }));
  assert.throws(() => new Coursier("   ", { x: 0, y: 0 }));
  assert.throws(() => new Coursier("Ana", { x: 0 }));
  assert.throws(() => new Coursier("Ana", { x: -2, y: 0 }));
});

test("Velo et Scooter heritent de Coursier avec leur propre vitesse", () => {
  const v = new Velo("Ana", { x: 0, y: 0 });
  const s = new Scooter("Bilal", { x: 0, y: 0 });
  assert.ok(v instanceof Coursier, "un Velo est un Coursier");
  assert.ok(s instanceof Coursier, "un Scooter est un Coursier");
  assert.equal(v.type, "velo");
  assert.equal(v.vitesse, 2);
  assert.equal(s.type, "scooter");
  assert.equal(s.vitesse, 3);
  assert.notEqual(v.symbole, s.symbole, "chaque type a sa lettre sur la carte");
});

test("toString : 'Ana (velo) en (1, 1)'", () => {
  assert.equal(String(new Velo("Ana", { x: 1, y: 1 })), "Ana (velo) en (1, 1)");
  assert.equal(String(new Scooter("Bilal", { x: 3, y: 0 })), "Bilal (scooter) en (3, 0)");
});

test("charger : le coursier prend la commande et une copie du chemin", () => {
  const c = new Velo("Ana", { x: 0, y: 0 });
  const commande = new Commande(1, { x: 2, y: 0 }, ["Reine"]);
  const chemin = [
    { x: 1, y: 0 },
    { x: 2, y: 0 },
  ];
  c.charger(commande, chemin);
  assert.equal(c.estLibre, false);
  assert.equal(c.commande, commande);
  assert.deepEqual(c.chemin, chemin);
  chemin.pop();
  assert.equal(c.chemin.length, 2, "le chemin doit etre copie");
});

test("charger refuse si le coursier livre deja", () => {
  const c = new Velo("Ana", { x: 0, y: 0 });
  c.charger(new Commande(1, { x: 2, y: 0 }, ["Reine"]), [{ x: 1, y: 0 }]);
  assert.throws(() => c.charger(new Commande(2, { x: 2, y: 0 }, ["Reine"]), []), /deja/);
});

test("avancer suit le chemin a la vitesse du coursier et dit s'il est arrive", () => {
  const chemin = [
    { x: 1, y: 0 },
    { x: 2, y: 0 },
    { x: 3, y: 0 },
    { x: 4, y: 0 },
    { x: 5, y: 0 },
  ];
  const velo = new Velo("Ana", { x: 0, y: 0 });
  velo.charger(new Commande(1, { x: 5, y: 0 }, ["Reine"]), chemin);
  assert.equal(velo.avancer(), false);
  assert.deepEqual(velo.position, { x: 2, y: 0 }, "un Velo fait 2 cases par tour");
  assert.equal(velo.avancer(), false);
  assert.deepEqual(velo.position, { x: 4, y: 0 });
  assert.equal(velo.avancer(), true, "apres la 5e case, le chemin est fini");
  assert.deepEqual(velo.position, { x: 5, y: 0 });
  assert.deepEqual(velo.chemin, []);

  const scooter = new Scooter("Bilal", { x: 0, y: 0 });
  scooter.charger(new Commande(2, { x: 5, y: 0 }, ["Reine"]), chemin);
  assert.equal(scooter.avancer(), false);
  assert.deepEqual(scooter.position, { x: 3, y: 0 }, "un Scooter fait 3 cases par tour");
  assert.equal(scooter.avancer(), true);
});

test("un coursier libre ne bouge pas", () => {
  const c = new Velo("Ana", { x: 1, y: 1 });
  assert.equal(c.avancer(), false);
  assert.deepEqual(c.position, { x: 1, y: 1 });
});

test("livrer rend la commande et libere le coursier", () => {
  const c = new Velo("Ana", { x: 0, y: 0 });
  const commande = new Commande(1, { x: 1, y: 0 }, ["Reine"]);
  c.charger(commande, [{ x: 1, y: 0 }]);
  assert.throws(() => c.livrer(), /arrive/, "pas encore arrive");
  c.avancer();
  assert.equal(c.livrer(), commande);
  assert.equal(c.estLibre, true);
  assert.throws(() => c.livrer(), /rien/, "plus rien a livrer");
});
