/**
 * La vue. Fournie, rien à modifier pour finir le projet.
 *
 * Son seul travail : afficher une Partie à l'écran. Elle lit la partie mais
 * ne la modifie jamais, et elle ne connaît ni fetch ni les règles du jeu.
 * C'est le V de MVC : si vous vouliez remplacer cet affichage par une
 * console, rien d'autre ne changerait dans le projet.
 */

/** Fabrique un élément avec sa classe et son texte. */
function elem(balise, classe, texte = "") {
  const e = document.createElement(balise);
  if (classe) e.className = classe;
  if (texte) e.textContent = texte;
  return e;
}

export class Vue {
  /**
   * racine  l'élément qui contient tout le jeu
   * Les sous-éléments sont retrouvés par leur id, une seule fois.
   */
  constructor(racine) {
    this.carte = racine.querySelector("#carte");
    this.tableauScore = racine.querySelector("#score");
    this.listeCoursiers = racine.querySelector("#coursiers");
    this.listeCommandes = racine.querySelector("#commandes");
    this.journal = racine.querySelector("#journal");
    this.cases = new Map();
  }

  /** Construit la grille du quartier. À appeler une fois, au démarrage. */
  dessinerQuartier(quartier) {
    this.carte.style.setProperty("--largeur", quartier.largeur);
    this.carte.replaceChildren();
    this.cases.clear();
    for (let y = 0; y < quartier.hauteur; y++) {
      for (let x = 0; x < quartier.largeur; x++) {
        const mur = quartier.plan[y][x] === "#";
        const c = elem("div", mur ? "case mur" : "case rue");
        c.title = `(${x}, ${y})`;
        this.carte.append(c);
        this.cases.set(`${x},${y}`, c);
      }
    }
    this.marquer(quartier.pizzeria, "pizzeria", "P");
  }

  /** Pose un contenu et une classe sur une case. */
  marquer(position, classe, contenu) {
    const c = this.cases.get(`${position.x},${position.y}`);
    if (!c) return;
    c.classList.add(classe);
    c.textContent = contenu;
  }

  /** Redessine tout ce qui bouge : coursiers, clients, compteurs, listes. */
  rafraichir(partie) {
    for (const c of this.cases.values()) {
      c.classList.remove("coursier", "client", "chemin");
      if (!c.classList.contains("pizzeria")) c.textContent = "";
    }

    for (const commande of partie.enAttente) {
      this.marquer(commande.destination, "client", "!");
    }
    for (const coursier of partie.coursiers) {
      if (coursier.estLibre) continue;
      for (const pas of coursier.chemin) {
        const c = this.cases.get(`${pas.x},${pas.y}`);
        if (c && !c.classList.contains("pizzeria")) c.classList.add("chemin");
      }
      this.marquer(coursier.commande.destination, "client", "!");
    }
    // Les coursiers en dernier : ils passent devant tout le reste.
    for (const coursier of partie.coursiers) {
      this.marquer(coursier.position, "coursier", coursier.symbole);
    }

    const { tick, score, enAttente, enCours, livrees } = partie.resume;
    this.tableauScore.replaceChildren(
      this.compteur("Tour", tick),
      this.compteur("Score", score),
      this.compteur("En attente", enAttente),
      this.compteur("En route", enCours),
      this.compteur("Livrees", livrees),
    );

    this.listeCoursiers.replaceChildren(
      ...partie.coursiers.map((c) => {
        const li = elem("li", c.estLibre ? "libre" : "occupe");
        const quoi = c.estLibre ? "libre" : `${c.commande} , ${c.chemin.length} cases`;
        li.append(elem("span", "symbole", c.symbole), elem("span", "nom", c.nom), elem("span", "detail", quoi));
        return li;
      }),
    );

    this.listeCommandes.replaceChildren(
      ...partie.enAttente.map((commande) => {
        const li = elem("li");
        li.append(elem("span", "detail", String(commande)), elem("span", "pizzas", commande.pizzas.join(", ")));
        return li;
      }),
    );
    if (partie.enAttente.length === 0) {
      this.listeCommandes.append(elem("li", "vide", "Rien en attente."));
    }
  }

  compteur(nom, valeur) {
    const d = elem("div", "compteur");
    d.append(elem("span", "valeur", String(valeur)), elem("span", "libelle", nom));
    return d;
  }

  /** Ajoute une ligne au journal, en haut. */
  noter(texte, classe = "") {
    const ligne = elem("p", classe, texte);
    this.journal.prepend(ligne);
    while (this.journal.children.length > 40) this.journal.lastChild.remove();
  }
}
