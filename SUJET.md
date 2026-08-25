# Pizza Rush, sujet du projet

**Le jeu en une phrase** : des clients commandent des pizzas, vos coursiers
partent de la pizzeria et les livrent, et une livraison rapporte d'autant plus
de points qu'elle est rapide.

**Ce que vous faites** : vous écrivez le cerveau de ce jeu, en JavaScript, dans
un navigateur, sans aucune bibliothèque.

**Ce qui est fourni** : les trois pages et leur CSS, l'affichage, le contrôleur,
les données, l'outil de test, **43 tests**, et un **squelette de code** où
toutes les fonctions à écrire sont déjà déclarées et documentées.

**Ce que vous rendez** : trois fichiers complétés, deux tests écrits par vous,
et un dépôt Git avec un commit par étape.

**Comment vous savez que c'est fini** : `npm test` affiche
`43 tests, tout est vert.` et le service se joue en entier dans le navigateur,
jusqu'au message `Service termine`.

## La marche à suivre

1. **Récupérez le projet.**

   ```bash
   git clone https://github.com/rohanfosse/pizza-rush-projet.git
   cd pizza-rush-projet
   ```

   Sans Git : [téléchargez le ZIP](https://github.com/rohanfosse/pizza-rush-projet/archive/refs/heads/main.zip)
   et décompressez-le. Le dépôt est ici :
   <https://github.com/rohanfosse/pizza-rush-projet>.

2. **Ouvrez-le.** Dans le dossier du projet, lancez `python -m http.server 8000`,
   puis allez sur `http://localhost:8000`. Les 43 tests sont rouges et le jeu
   affiche une erreur : c'est le point de départ normal.

3. **Écrivez le code manquant**, dans cet ordre : `src/modeles.js`, puis
   `src/algos.js`, puis `src/jeu.js`. Chaque endroit à compléter porte un
   `// TODO`. Vous ne créez aucun fichier, vous n'en renommez aucun, et vous ne
   changez aucune signature de fonction.

4. **Ajoutez vos propres tests** dans `tests/test_4_les_votres.js`, deux au
   minimum.

5. **Rendez votre dépôt** lorsque `npm test` affiche
   `43 tests, tout est vert.` et que le service se joue en entier dans le
   navigateur.

**Les quatre pages du projet**, qui partagent la même feuille de style :

| Page | À quoi elle sert |
| --- | --- |
| `index.html` | ce sujet, la page d'accueil |
| `jeu.html` | le jeu : la carte, les coursiers, le journal du service. Tant qu'une fonction n'est pas écrite, le journal affiche son nom |
| `tests.html` | les 43 tests dans le navigateur. Le premier test rouge est votre prochaine étape |
| `verifier.html` | vos fichiers déposés dans la page, les 43 tests exécutés contre votre code, sans rien installer |

---

## Sommaire

1. [Le projet en bref](#1-le-projet-en-bref)
2. [Les règles du jeu](#2-les-règles-du-jeu)
3. [Ce qui est fourni, ce que vous écrivez](#3-ce-qui-est-fourni-ce-que-vous-écrivez)
4. [Mise en route](#4-mise-en-route)
5. [Comment travailler : le cycle des tests](#5-comment-travailler--le-cycle-des-tests)
6. [Conventions et règles de codage](#6-conventions-et-règles-de-codage)
7. [Étape 1 : les modèles](#7-étape-1--les-modèles)
8. [Étape 2 : les algorithmes](#8-étape-2--les-algorithmes)
9. [Étape 3 : le réseau et la partie](#9-étape-3--le-réseau-et-la-partie)
10. [Étape 4 : vos propres tests](#10-étape-4--vos-propres-tests)
11. [L'architecture du projet (MVC)](#11-larchitecture-du-projet-mvc)
12. [Ce qui est attendu au rendu](#12-ce-qui-est-attendu-au-rendu)
13. [Problèmes courants](#13-problèmes-courants)
14. [Ressources par notion](#14-ressources-par-notion)
15. [Pour aller plus loin](#15-pour-aller-plus-loin-facultatif)

---

## 1. Le projet en bref

Une pizzeria est installée dans un quartier dessiné comme une grille de rues et
d'immeubles. Pendant le service, des commandes arrivent les unes après les
autres. Trois coursiers, deux vélos et un scooter, vont chercher les pizzas à la
pizzeria et les portent chez les clients.

Le jeu se joue **au tour par tour** : à chaque tour, les nouvelles commandes
arrivent, un coursier libre part pour chacune, tout le monde avance de quelques
cases, et ceux qui sont arrivés livrent.

Vous n'écrivez **ni HTML ni CSS**, et pas non plus l'affichage. Vous écrivez la
logique :

| Vous écrivez | C'est-à-dire |
| --- | --- |
| `src/modeles.js` | les objets du jeu : une commande, un coursier, un vélo, un scooter |
| `src/algos.js` | se repérer sur la carte, trouver un chemin, choisir le coursier qui part |
| `src/jeu.js` | charger les données par le réseau, et appliquer les règles du jeu |
| `tests/test_4_les_votres.js` | deux tests de votre cru |

### Ce que ce projet vous fait travailler

- **Programmation objet** : écrire une classe qui refuse des données invalides,
  utiliser l'héritage pour ne pas écrire deux fois le même code, comprendre
  pourquoi une méthode écrite une seule fois dans la classe mère se comporte
  différemment dans deux sous-classes.
- **Algorithmique** : représenter une carte en mémoire, écrire un parcours en
  largeur (BFS) et reconstruire le chemin trouvé, évaluer le coût d'un
  algorithme.
- **Réseau** : faire une requête HTTP avec `fetch`, lire un code de réponse,
  décoder du JSON, comprendre pourquoi un serveur local est nécessaire.
- **Génie logiciel** : séparer modèle, vue et contrôleur, ne pas modifier ses
  arguments, signaler une erreur par une exception, valider ce qui vient de
  l'extérieur, lire une suite de tests comme une spécification et en écrire.

### Prérequis

Savoir programmer dans un langage quelconque, y compris la notion de classe.
Une connaissance sommaire de HTML et de JavaScript suffit. Si une notion vous
manque (classes, `fetch`, `async`, parcours en largeur), la
[section 14](#14-ressources-par-notion) donne une ressource pour chacune, et
chaque étape rappelle celles qui la concernent.

Outils : un navigateur, un éditeur de texte, et Python ou Node pour lancer un
serveur local. Node permet en plus de lancer les tests en console.

---

## 2. Les règles du jeu

Le jeu tient en six règles, listées en fin de section. Tout le reste n'est que
du détail sur ces six règles.

### 2.1 Le tour de jeu

Un tour se déroule toujours dans cet ordre, sans exception :

```text
1. LES ARRIVEES     les commandes du moment entrent dans la file d'attente
                    (le contrôleur, fourni)

2. LES DEPARTS      pour chaque commande en attente, le coursier libre le
                    plus proche part la livrer
                    (Partie.assigner, à écrire)

3. LES DEPLACEMENTS le compteur de tours augmente de 1, et chaque coursier
                    en route avance de quelques cases
                    (Partie.avancer, à écrire)

4. LES LIVRAISONS   ceux qui sont arrivés chez leur client livrent et
                    marquent des points
                    (Partie.avancer, à écrire)
```

`Partie.tour()` enchaîne les points 2, 3 et 4. Conséquence utile : une commande
confiée à un coursier au tour T le voit avancer dès le tour T.

### 2.2 Le quartier

Le quartier est une grille. Chaque case est soit une **rue**, où l'on peut
passer, soit un **immeuble**, où l'on ne peut pas. Il est décrit par
`donnees/quartier.json` :

```json
{
  "nom": "Quartier des Tanneurs",
  "largeur": 14,
  "hauteur": 10,
  "pizzeria": { "x": 1, "y": 1 },
  "plan": ["..............", ".....##...##..", "..."]
}
```

- `plan` est un tableau de chaînes, une chaîne par ligne de la carte.
- Le caractère `plan[y][x]` vaut `"."` pour une rue, `"#"` pour un immeuble.
  Attention à l'ordre : **ligne d'abord (`y`), colonne ensuite (`x`)**.
- Une **position** est un objet `{x, y}` : `x` est la colonne, `y` la ligne,
  toutes deux à partir de 0. La case en haut à gauche est `{x: 0, y: 0}`.
- La **pizzeria** est une case du quartier. C'est le seul endroit où l'on prend
  des pizzas.

Un petit quartier, tel qu'il apparaît dans les tests :

```text
      x 0 1 2 3 4
    y 0 . . . . .        "."  rue
      1 . # # # .        "#"  immeuble
      2 . # . . .
      3 . . . . .        pizzeria en (0, 0)
```

**On se déplace en haut, à droite, en bas, à gauche, jamais en diagonale.** Une
case hors de la grille compte comme un immeuble : on ne peut pas y aller.

### 2.3 Les commandes

Une commande, c'est un client qui veut des pizzas à une adresse :

| Propriété | Sens |
| --- | --- |
| `id` | numéro de la commande, entier strictement positif |
| `destination` | la case du client, une position `{x, y}` |
| `pizzas` | la liste des pizzas commandées, au moins une |
| `creeeAu` | le numéro du tour où la commande est arrivée |
| `livreeAu` | le tour de livraison, `null` tant qu'elle n'est pas livrée |

Les commandes du service sont écrites à l'avance dans `donnees/commandes.json`
avec leur tour d'arrivée : une commande dont `creeeAu` vaut 12 apparaît au
tour 12.

Elles sont servies **dans l'ordre où elles arrivent** : premier arrivé, premier
servi. Aucun tri, aucune priorité.

Une commande est **refusée** dans un seul cas : sa destination est
**inaccessible** depuis la pizzeria, parce qu'elle est hors carte, sur un
immeuble, ou coupée du reste du quartier par des immeubles. Elle n'entre alors
pas dans la file, sinon elle y resterait pour toujours et le service ne se
terminerait jamais. Le refus est signalé par une exception ; le contrôleur
l'écrit dans le journal et la partie continue.

### 2.4 Les coursiers

Un coursier a un nom et une position. À tout instant, il est soit **libre**,
soit **en route** : il porte une commande et il lui reste un chemin à parcourir.
Les trois types ne diffèrent que par leur vitesse :

| Classe | `type` | Vitesse (cases par tour) | Lettre sur la carte |
| --- | --- | --- | --- |
| `Coursier` (à pied, classe de base) | `"coursier"` | 1 | `C` |
| `Velo` | `"velo"` | 2 | `V` |
| `Scooter` | `"scooter"` | 3 | `S` |

La flotte du jeu, définie dans `src/main.js` : **Ana** (vélo), **Cheikh**
(vélo), **Bilal** (scooter). Tous les trois démarrent à la pizzeria.

- Un coursier libre ne bouge pas. Il reste là où sa dernière livraison l'a
  laissé, il ne rentre pas automatiquement à la pizzeria.
- Un coursier en route ne peut pas prendre une deuxième commande.
- Un coursier avance d'**au plus `vitesse` cases par tour**. S'il ne reste
  qu'une case et que sa vitesse est 3, il fait cette case et s'arrête : il est
  arrivé.
- Le nombre de pizzas ne le gêne pas : n'importe quel coursier peut prendre
  n'importe quelle commande.

### 2.5 Qui part livrer

Un coursier ne va jamais directement chez le client : il passe d'abord prendre
les pizzas à la pizzeria. Son **itinéraire** est donc en deux morceaux mis bout
à bout, chacun étant un plus court chemin qui évite les immeubles :

```text
position du coursier  ->  pizzeria  ->  client
```

Le passage à la pizzeria ne coupe pas le déplacement : l'itinéraire est un seul
chemin, du coursier au client en passant par la pizzeria. Un scooter qui atteint
la pizzeria alors qu'il lui reste deux cases à parcourir ce tour-là continue
immédiatement vers le client.

Pour une commande en attente, **c'est le coursier libre le plus proche qui
part** : celui dont l'itinéraire compte le moins de cases. Un scooter rapide
mais à l'autre bout du quartier perd donc contre un vélo déjà sur place.

À distance égale, c'est le premier nom dans l'ordre alphabétique qui part. Cette
règle n'a pas d'autre but que de rendre le jeu reproductible : deux exécutions
donnent exactement le même déroulé, ce qui est indispensable pour tester.

S'il n'y a plus aucun coursier libre, la commande reste dans la file et sera
reproposée au tour suivant.

### 2.6 Les points

```text
delai  = livreeAu - creeeAu             le nombre de tours d'attente du client
points = (30 - delai) x nombre de pizzas, et jamais moins de zero
```

| Commande | `creeeAu` | `livreeAu` | Délai | Pizzas | Points |
| --- | --- | --- | --- | --- | --- |
| rapide | 0 | 2 | 2 | 1 | `(30 - 2) x 1` = **28** |
| moyenne | 10 | 14 | 4 | 2 | `(30 - 4) x 2` = **52** |
| très tardive | 0 | 40 | 40 | 2 | **0**, on ne descend pas sous zéro |

Le score de la partie est la somme des points de toutes les livraisons. Sur le
quartier fourni, un service complet donne environ 720 points en 81 tours.

### 2.7 La fin du service

Le service est terminé quand les trois conditions sont réunies :

- plus aucune commande à venir dans le carnet,
- la file d'attente est vide,
- aucun coursier n'est en route.

Le contrôleur affiche alors le nombre de tours et le score final.

### 2.8 Un service joué à la main

Avec **Ana** (vélo, vitesse 2) et **Bob** (scooter, vitesse 3), tous deux à la
pizzeria en `(0, 0)`, et la commande numéro 1 qui arrive au tour 0 : une pizza
pour `(4, 0)`.

```text
      x 0 1 2 3 4
    y 0 P . . . C     P = pizzeria, C = le client de la commande 1
      1 . # # # .
      2 . . . . .
```

| Tour | Ce qui se passe | Le détail |
| --- | --- | --- |
| 0 | La commande entre dans la file | destination accessible, elle est acceptée |
| 0 | Départ | Ana et Bob sont tous deux à la pizzeria, donc à 4 cases du client. Égalité, c'est Ana qui part (ordre alphabétique) |
| 1 | Déplacement | Ana fait 2 cases, elle est en `(2, 0)`. Rien à livrer |
| 2 | Déplacement, puis livraison | Ana arrive en `(4, 0)`. Délai = 2 - 0 = 2, donc `(30 - 2) x 1` = **28 points** |
| 2 | Fin du service | plus rien à venir, file vide, personne en route |

Ce déroulé est exactement celui du test
`avancer fait passer un tour, deplace les coursiers et livre a l'arrivee`, dans
`tests/test_3_jeu.js`. Si vous doutez d'une règle, le test correspondant
tranche.

### 2.9 Les six règles du jeu

1. Toute livraison part de la pizzeria : le coursier va d'abord y prendre les
   pizzas, puis va chez le client.
2. On se déplace en haut, à droite, en bas, à gauche, jamais en diagonale, et
   jamais à travers un immeuble.
3. Les commandes sont servies dans leur ordre d'arrivée.
4. Pour chaque commande, c'est le coursier libre le plus proche qui part. À
   distance égale, le premier nom dans l'ordre alphabétique.
5. Un coursier avance d'au plus `vitesse` cases par tour, et ne porte qu'une
   commande à la fois.
6. Une livraison rapporte `(30 - delai) x nombre de pizzas`, jamais moins de
   zéro.

Et un point de vocabulaire, qui n'est pas une règle du jeu mais qui revient
partout dans le code : un **chemin** est une liste de positions **sans** la case
de départ et **avec** la case d'arrivée. Un chemin vide veut dire « on est déjà
arrivé ».

---

## 3. Ce qui est fourni, ce que vous écrivez

### 3.1 L'arborescence

```text
pizza-rush/
    index.html                FOURNI  le sujet, la page d'accueil
    jeu.html                  FOURNI  le jeu
    tests.html                FOURNI  les tests dans le navigateur
    verifier.html             FOURNI  vos fichiers testes en ligne
    style.css                 FOURNI  l'habillage des trois pages
    package.json              FOURNI  pour npm test
    donnees/
        quartier.json         FOURNI  le plan du quartier
        commandes.json        FOURNI  le carnet de commandes du service
    src/
        modeles.js         <- A ECRIRE   etape 1
        algos.js           <- A ECRIRE   etape 2
        jeu.js             <- A ECRIRE   etape 3
        vue.js                FOURNI  l'affichage, a lire
        main.js               FOURNI  le controleur, a lire
    tests/
        mini.js               FOURNI  le mini outil de test
        test_1_modeles.js     FOURNI  15 tests
        test_2_algos.js       FOURNI  13 tests
        test_3_jeu.js         FOURNI  15 tests
        test_4_les_votres.js  <- A ECRIRE   etape 4
        lancer-node.js        FOURNI  lance les tests en console
```

| Fichiers | Ce que vous en faites |
| --- | --- |
| `src/modeles.js`, `src/algos.js`, `src/jeu.js` | vous les complétez : c'est tout le travail |
| `tests/test_4_les_votres.js` | vous y ajoutez au moins deux tests |
| `tests/test_1`, `test_2`, `test_3`, `tests/mini.js` | vous n'y touchez jamais : ce sont l'énoncé |
| `src/vue.js`, `src/main.js`, les pages, `style.css`, `donnees/` | vous les lisez, vous ne les modifiez pas |

Quatre fichiers à modifier, pas un de plus. Aucun fichier à créer, aucun nom à
changer : les tests importent ces chemins exacts, et votre code cessera d'être
trouvé si vous déplacez quoi que ce soit. Si vous pensez avoir trouvé une erreur
dans un test fourni, signalez-la, ne la corrigez pas.

### 3.2 Le squelette

Les trois fichiers à écrire sont déjà fournis, remplis, mais vides de logique.
Chaque fonction existe, avec son nom exact, ses paramètres, et un commentaire
qui dit ce qu'elle doit renvoyer et quelles erreurs elle doit lever. La méthode,
elle, est dans ce sujet : le squelette pose le contrat, il ne fait pas le
travail. Le corps ne contient que deux lignes :

```js
/** La cle texte d'une position : {x: 3, y: 7} donne "3,7". */
export function cle(position) {
  // TODO etape 2 : ecrire cle
  throw new Error("etape 2 : cle");
}
```

Votre travail consiste à remplacer chacun de ces `throw` par du vrai code. Vous
n'avez ni fichier à créer, ni `import` ou `export` à écrire, ni signature à
inventer : tout est en place.

Ces `throw` servent aussi pendant le développement : quand vous ouvrez le jeu,
la page affiche le message de la première fonction non écrite. C'est votre
prochaine étape, sans avoir à chercher. Pour voir tout ce qu'il reste à faire :

```bash
grep -rn "TODO" src/ tests/test_4_les_votres.js
```

### 3.3 La carte de ce qu'il y a à écrire

| Étape | Fichier | À écrire | Tests |
| --- | --- | --- | --- |
| 1 | `src/modeles.js` | `Commande` (constructeur, `nbPizzas`, `toString`), `Coursier` (constructeur, `estLibre`, `charger`, `avancer`, `livrer`, `toString`), `Velo`, `Scooter` | 15 |
| 2 | `src/algos.js` | `cle`, `estLibre`, `voisins`, `plusCourtChemin`, `itineraire`, `coursierLePlusProche` | 13 |
| 3 | `src/jeu.js` | `chargerJson`, `chargerQuartier`, `chargerCommandes`, `Partie` (constructeur, `ajouterCommande`, `assigner`, `avancer`, `tour`, `points`) | 15 |
| 4 | `tests/test_4_les_votres.js` | au moins 2 tests à vous | 2 minimum |

Les étapes se font dans l'ordre : l'étape 2 utilise les classes de l'étape 1,
l'étape 3 utilise les fonctions de l'étape 2.

---

## 4. Mise en route

### 4.1 Pourquoi un serveur local est nécessaire

Un navigateur refuse de charger des modules JavaScript
(`<script type="module">`) depuis une adresse `file://`, pour des raisons de
sécurité. Si vous double-cliquez sur `jeu.html`, vous obtiendrez une page
blanche et une erreur dans la console. Il faut servir le dossier par HTTP.
Depuis le dossier du projet, au choix :

```bash
python -m http.server 8000     # si vous avez Python
npx serve                      # si vous avez Node
```

Puis, dans le navigateur, les trois pages du projet :

- le sujet, celui que vous lisez : <http://localhost:8000>
- le jeu : <http://localhost:8000/jeu.html>
- les tests : <http://localhost:8000/tests.html>

### 4.2 Lancer les tests en console

Si Node est installé, c'est le plus rapide pendant le développement :

```bash
npm test
```

```text
etape 1 : modeles
  KO  une commande garde ce qu'on lui donne
      Error : etape 1 : le constructeur de Commande
  ...

43 rate(s) sur 43.
Prochaine chose a faire : Error : etape 1 : le constructeur de Commande
```

### 4.3 À quoi ressemble un premier lancement réussi

Les 43 tests échouent, et la page du jeu affiche une erreur nommant la première
fonction manquante. C'est normal, c'est le point de départ. Si c'est ce que vous
voyez, votre environnement fonctionne et vous pouvez commencer.

### 4.4 Sans rien installer

Si vous ne pouvez pas lancer de serveur local, sur une machine de l'école par
exemple, la page `verifier.html` fait le travail : vous y déposez vos fichiers
`modeles.js`, `algos.js` et `jeu.js`, les 43 tests s'exécutent contre votre
code, et un bouton lance la partie avec vos fonctions.

Tout se passe dans votre navigateur : votre code n'est ni envoyé au serveur, ni
enregistré quelque part. Pensez seulement à recharger vos fichiers après chaque
modification, la page ne les surveille pas toute seule.

Cette page dépanne, elle ne remplace pas le serveur local : vous travaillez plus
vite avec votre éditeur, `npm test` dans un terminal et le jeu dans un onglet.

---

## 5. Comment travailler : le cycle des tests

Les 43 tests fournis sont l'énoncé détaillé : chacun décrit un comportement
précis attendu. Votre boucle de travail :

1. lancer `npm test` ;
2. lire le **premier** test rouge ;
3. ouvrir ce test et lire ce qu'il attend ;
4. ouvrir la fonction correspondante et sa documentation ;
5. écrire le code ;
6. relancer, et recommencer.

Ne cherchez pas à tout écrire avant de lancer les tests. Une fonction, un test
au vert, on avance.

### Lire un test

```js
test("toString : 'Commande #3 : 2 pizzas pour (4, 7)'", () => {
  assert.equal(String(new Commande(3, { x: 4, y: 7 }, ["Reine", "Vege"])),
               "Commande #3 : 2 pizzas pour (4, 7)");
  assert.equal(String(new Commande(8, { x: 0, y: 1 }, ["Reine"])),
               "Commande #8 : 1 pizza pour (0, 1)");
});
```

Ce test vous dit tout : le format exact, l'espace après le `#`, la virgule dans
les coordonnées, et le singulier de « pizza » quand il n'y en a qu'une. Il n'y a
rien à deviner.

Les assertions disponibles, dans `tests/mini.js`, prennent **toujours d'abord ce
qu'on a obtenu, puis ce qu'on attendait** :

| Assertion | Vérifie |
| --- | --- |
| `assert.ok(valeur)` | que la valeur est vraie |
| `assert.equal(obtenu, attendu)` | égalité stricte : nombres, chaînes, même objet |
| `assert.notEqual(obtenu, attendu)` | non-égalité |
| `assert.deepEqual(obtenu, attendu)` | égalité de structure : tableaux, objets |
| `assert.throws(fn, /motif/)` | que `fn()` lève une erreur dont le message contient le motif |
| `await assert.rejects(promesse, /motif/)` | la même chose pour une promesse rejetée |

### Lire un échec

```text
KO  coursierLePlusProche : celui qui a le moins de cases a faire
    attendu {"nom":"Bilal"}, obtenu {"nom":"Ana"}
```

Deux lignes : ce qui était attendu, ce qui a été obtenu. Comparez-les avant de
toucher au code.

---

## 6. Conventions et règles de codage

Ces conventions valent pour tout le projet. Les tests en vérifient une partie,
le reste est évalué à la lecture de votre code.

### 6.1 Le vocabulaire

| Terme | Définition exacte |
| --- | --- |
| **position** | un objet `{x, y}`, deux entiers positifs ou nuls. `x` = colonne, `y` = ligne |
| **quartier** | l'objet lu dans `quartier.json` : `{largeur, hauteur, pizzeria, plan}`, où `plan[y][x]` vaut `"."` ou `"#"` |
| **chemin** | une liste de positions, **sans** la case de départ, **avec** la case d'arrivée. `[]` signifie « déjà arrivé » |
| **tour** (`tick`) | l'unité de temps du jeu, un entier qui part de 0 |
| **itinéraire** | le chemin complet d'une livraison : coursier, puis pizzeria, puis client |

### 6.2 Une fonction ne modifie pas ses arguments

C'est la règle la plus importante du projet. Un constructeur **copie** la
position et la liste de pizzas qu'il reçoit ; `charger` copie le chemin qu'on
lui donne.

Pourquoi : une fonction qui modifie ses arguments provoque des bugs à distance,
dans du code qui ne l'appelle même pas. Ils sont pénibles à trouver, parce que
le symptôme apparaît loin de la cause. Plusieurs tests vérifient cette règle.

Pour copier : `[...liste]` pour un tableau, `{ x: p.x, y: p.y }` pour une
position.

### 6.3 Une anomalie se signale par une exception

```js
// l'appelant sait ce qui s'est passe et peut reagir
throw new Error(`commande ${id} inaccessible depuis la pizzeria`);

// l'appelant recoit null et ne sait pas pourquoi
console.log("erreur");
return null;
```

Le message doit dire la nature du problème et l'élément concerné. Certains tests
vérifient qu'un mot précis apparaît dans le message. Ces mots sont indiqués dans
la documentation de chaque fonction, et rappelés dans ce sujet : `deja`, `rien`,
`arrive`, `inaccessible`, `quartier invalide`.

Une valeur `null` reste légitime quand elle est un **résultat normal** et non
une erreur : `plusCourtChemin` renvoie `null` quand il n'existe pas de chemin,
et c'est documenté comme tel.

### 6.4 Les données venues de l'extérieur sont validées

Un constructeur contrôle ses arguments, `chargerQuartier` contrôle le fichier
reçu. Un contrôle fait tôt produit un message précis, du genre « quartier
invalide : la ligne 3 fait 12 caracteres au lieu de 14 ». La même erreur
détectée plus tard produit un message incompréhensible, très loin de sa cause.

### 6.5 Les chaînes renvoyées par le code sont sans accents

Convention du projet, pour éviter tout problème d'encodage dans les comparaisons
de tests : `"velo"`, pas `"vélo"`. En revanche, vos commentaires et votre
documentation sont en français accentué.

---

## 7. Étape 1 : les modèles

**Fichier** : `src/modeles.js`. **Tests** : `tests/test_1_modeles.js`, 15 tests.

Cette étape crée les objets du jeu : une commande, un coursier, et deux types de
coursiers. Rien ici ne connaît la carte, les règles ni l'écran : ce sont des
objets simples, faciles à tester.

### 7.1 La classe `Commande`

| Élément | À faire |
| --- | --- |
| `constructor(id, destination, pizzas, creeeAu = 0)` | ranger les données dans `this.id`, `this.destination`, `this.pizzas`, `this.creeeAu`, et mettre `this.livreeAu` à `null` |
| `get nbPizzas()` | le nombre de pizzas de la commande |
| `toString()` | `"Commande #3 : 2 pizzas pour (4, 7)"`, et `"1 pizza"` au singulier |

Le constructeur **copie** la destination et la liste de pizzas : modifier après
coup l'objet qu'on lui a passé ne doit rien changer à la commande.

Il lève une `Error` si :

- `id` n'est pas un entier strictement positif (`0`, `-1`, `"3"` sont refusés) ;
- `destination` n'est pas une position valide. Utilisez `estUnePosition`, qui
  est fournie en haut du fichier ;
- `pizzas` est vide ou n'est pas un tableau.

### 7.2 La classe `Coursier`

| Élément | À faire |
| --- | --- |
| `constructor(nom, position)` | ranger `this.nom` et une **copie** de `this.position` ; au départ `this.commande` vaut `null` et `this.chemin` vaut `[]` |
| `get estLibre()` | vrai s'il n'a pas de commande en cours |
| `charger(commande, chemin)` | prendre la commande et une **copie** du chemin |
| `avancer()` | avancer d'au plus `vitesse` cases, et renvoyer « est-il arrivé ? » |
| `livrer()` | rendre la commande, redevenir libre, et renvoyer la commande |
| `toString()` | `"Ana (velo) en (1, 1)"` |

Le constructeur lève une `Error` si le nom est vide, ou seulement des espaces,
ou si la position est invalide.

`charger` lève une `Error` si le coursier livre déjà, avec un message contenant
`deja`.

`avancer` en détail : le coursier retire jusqu'à `vitesse` cases du **début** de
son chemin, et chaque case retirée devient sa nouvelle position. Il renvoie
`true` si le chemin est vide **après** ce déplacement, `false` sinon. Un
coursier libre ne bouge pas et renvoie `false`.

```text
chemin = [(1,0), (2,0), (3,0), (4,0), (5,0)]   un velo (vitesse 2) en (0,0)

avancer() -> position (2,0), chemin = [(3,0), (4,0), (5,0)]   renvoie false
avancer() -> position (4,0), chemin = [(5,0)]                 renvoie false
avancer() -> position (5,0), chemin = []                      renvoie true
```

`livrer` lève une `Error` s'il n'y a rien à livrer (message contenant `rien`) ou
si le chemin n'est pas terminé (message contenant `arrive`).

### 7.3 `Velo` et `Scooter` : l'héritage

C'est le point le plus intéressant de l'étape. Ces deux classes héritent de
`Coursier` et **ne redéfinissent que trois accesseurs** : `type`, `vitesse` et
`symbole`, la lettre affichée sur la carte. Rien d'autre. Chacune tient en
quelques lignes.

```js
export class Velo extends Coursier {
  get type() {
    return "velo";
  }
  // et vitesse, et symbole
}
```

**Pourquoi il n'y a rien d'autre à écrire** : `charger`, `avancer` et `livrer`
sont écrites une seule fois, dans `Coursier`. Le code de `avancer` lit
`this.vitesse`, qui vaut 2 quand l'objet est un vélo et 3 quand c'est un
scooter. La même méthode se comporte donc différemment selon le type réel de
l'objet, sans un seul `if`. Si vous vous surprenez à copier une méthode de
`Coursier` dans `Velo`, arrêtez-vous : c'est le signe qu'une valeur doit devenir
un accesseur.

### 7.4 Si une notion vous manque

| Notion | Ressource |
| --- | --- |
| classe, constructeur, `this` | [Les classes](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Classes), [`constructor`](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Classes/constructor) |
| accesseur | [`get`](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Functions/get) |
| héritage | [`extends`](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Classes/extends), [`super`](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Operators/super) |
| lever une erreur | [`throw`](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Statements/throw), [`Error`](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Error) |
| copier un tableau ou un objet | [Syntaxe de décomposition](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Operators/Spread_syntax) |
| construire une chaîne | [Littéraux de gabarits](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Template_literals) |
| vérifier un entier, un tableau | [`Number.isInteger`](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Number/isInteger), [`Array.isArray`](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray) |

**L'étape est finie quand** les 15 tests de `etape 1 : modeles` sont au vert.
Faites un commit.

---

## 8. Étape 2 : les algorithmes

**Fichier** : `src/algos.js`. **Tests** : `tests/test_2_algos.js`, 13 tests.

Six fonctions, dont aucune ne modifie ses arguments : elles reçoivent des
données et renvoient un résultat. Ce sont des fonctions pures, et c'est ce qui
les rend faciles à tester.

### 8.1 Les trois fonctions de base

| Fonction | Rôle | Exemple |
| --- | --- | --- |
| `cle(position)` | la clé texte d'une position | `cle({x: 3, y: 7})` donne `"3,7"` |
| `estLibre(quartier, position)` | vrai si la case est dans la carte et n'est pas un immeuble | `estLibre(Q, {x: -1, y: 0})` donne `false` |
| `voisins(quartier, position)` | les cases libres adjacentes, dans l'ordre **haut, droite, bas, gauche** | voir ci-dessous |

**Pourquoi `cle` existe.** Deux objets `{x: 1, y: 2}` construits séparément ne
sont jamais considérés comme égaux par un `Set` ou une `Map` : ce sont deux
objets distincts en mémoire, même s'ils contiennent la même chose. Deux chaînes
`"1,2"`, elles, sont égales.

```js
new Set([{ x: 1, y: 2 }]).has({ x: 1, y: 2 });   // false
new Set(["1,2"]).has("1,2");                     // true
```

**L'ordre des voisins compte** : il est vérifié par les tests, et il détermine
lequel des plusieurs plus courts chemins possibles sera trouvé. Sur le quartier
de test, `voisins(Q, {x: 2, y: 3})` renvoie
`[{x:2,y:2}, {x:3,y:3}, {x:1,y:3}]` : haut, droite, gauche, le bas étant hors
carte.

### 8.2 `plusCourtChemin` : le parcours en largeur

C'est le cœur de l'étape. Le problème : trouver le trajet le plus court entre
deux cases, en évitant les immeubles.

**L'idée.** On explore la carte par cercles concentriques autour du départ :
d'abord toutes les cases à un pas, puis toutes celles à deux pas, et ainsi de
suite. La première fois qu'on touche l'arrivée, on y est forcément arrivé par le
chemin le plus court, puisqu'on a déjà exploré tout ce qui était plus proche.

**Les deux structures.**

- Une **file**, un simple tableau, contenant les cases à explorer : on ajoute à
  la fin avec `push`, on retire au début avec `shift`. C'est ce qui donne
  l'ordre par cercles.
- Une **`Map`** qui, pour chaque case déjà vue, retient par quelle case on y est
  arrivé. Elle sert à savoir si une case a déjà été vue, et à reconstruire le
  chemin à la fin.

**Le pseudo-code.**

```text
si le depart ou l'arrivee est bloque      -> renvoyer null
si depart == arrivee                      -> renvoyer []

precedent <- Map { cle(depart) : null }
file      <- [ depart ]

tant que la file n'est pas vide :
    courant <- file.shift()
    pour chaque voisin de courant :
        si precedent connait deja ce voisin -> passer au suivant
        precedent.set(cle(voisin), courant)
        si voisin == arrivee                -> RECONSTRUIRE et renvoyer
        file.push(voisin)

renvoyer null            (la file s'est videe sans trouver l'arrivee)

RECONSTRUIRE :
    partir de l'arrivee, remonter de precedent en precedent jusqu'au depart
    en empilant les cases, puis inverser la liste obtenue
```

**Un déroulé complet**, sur cette carte, de `(0, 0)` à `(2, 1)` :

```text
      x 0 1 2
    y 0 . . .
      1 . # .
      2 . . .
```

| Case sortie de la file | Voisins découverts | File après | `precedent` complété par |
| --- | --- | --- | --- |
| `(0,0)` | `(1,0)`, `(0,1)` | `[(1,0), (0,1)]` | `1,0` vient de `(0,0)`, `0,1` vient de `(0,0)` |
| `(1,0)` | `(2,0)`, le bas est un immeuble | `[(0,1), (2,0)]` | `2,0` vient de `(1,0)` |
| `(0,1)` | `(0,2)` | `[(2,0), (0,2)]` | `0,2` vient de `(0,1)` |
| `(2,0)` | `(2,1)`, **l'arrivée** | fin | `2,1` vient de `(2,0)` |

Reconstruction : `(2,1)` vient de `(2,0)`, qui vient de `(1,0)`, qui vient de
`(0,0)`, le départ, où l'on s'arrête. On a empilé `[(2,1), (2,0), (1,0)]`, on
inverse :

```text
chemin = [(1,0), (2,0), (2,1)]     3 cases, sans le depart, avec l'arrivee
```

**Ce que la fonction renvoie.**

| Situation | Résultat |
| --- | --- |
| un chemin existe | la liste des positions, sans le départ, avec l'arrivée |
| départ et arrivée sont la même case | `[]` |
| départ ou arrivée sur un immeuble, ou hors carte | `null` |
| aucun chemin, quartier coupé en deux | `null` |

**À écrire aussi** : la complexité de la fonction, en commentaire juste
au-dessus, avec sa justification. Une ou deux phrases suffisent : combien de
fois chaque case est-elle visitée au maximum, et pourquoi.

### 8.3 Les deux fonctions de décision

**`itineraire(quartier, coursier, commande)`** construit le chemin complet d'une
livraison : de la position du coursier jusqu'à la pizzeria, puis de la pizzeria
jusqu'au client, les deux morceaux mis bout à bout. Renvoie `null` si l'un des
deux est impossible.

**`coursierLePlusProche(coursiers, commande, quartier)`** applique la règle 2.5 :
parmi les coursiers **libres** pour qui un itinéraire existe, celui dont
l'itinéraire compte **le moins de cases** ; à égalité, le premier nom dans
l'ordre alphabétique. `null` s'il n'y a personne.

### 8.4 Si une notion vous manque

| Notion | Ressource |
| --- | --- |
| le parcours en largeur | [Parcours en largeur, Wikipédia](https://fr.wikipedia.org/wiki/Algorithme_de_parcours_en_largeur), [introduction visuelle et animée, en anglais](https://www.redblobgames.com/pathfinding/a-star/introduction.html) |
| `Map` et `Set` | [`Map`](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Map), [`Set`](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Set) |
| un tableau comme file | [`push`](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array/push), [`shift`](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array/shift) |
| filtrer, transformer une liste | [`filter`](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array/filter), [`map`](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array/map) |
| comparer deux noms | [`localeCompare`](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/String/localeCompare) |

**L'étape est finie quand** les 13 tests de `etape 2 : algos` sont au vert et
que la complexité de `plusCourtChemin` est écrite et justifiée. Faites un
commit.

---

## 9. Étape 3 : le réseau et la partie

**Fichier** : `src/jeu.js`. **Tests** : `tests/test_3_jeu.js`, 15 tests.

Deux sujets distincts dans le même fichier : charger les données depuis le
réseau, puis appliquer les règles du jeu.

### 9.1 Charger les données : `fetch`, HTTP et JSON

Un fichier JSON posé à côté de la page se lit exactement comme on appellerait
une API : une requête HTTP part, une réponse revient avec un code. C'est le même
mécanisme et le même code JavaScript.

**`chargerJson(url, fetchFn = fetch)`** fait un GET sur l'URL et renvoie le JSON
décodé.

- `fetch` renvoie une promesse, et la méthode `json()` de la réponse aussi : les
  trois fonctions de chargement sont donc `async` et utilisent `await`.
- **On vérifie toujours le code de réponse avant de lire le contenu.** La
  réponse a une propriété `ok`, vraie pour un code 2xx, et une propriété
  `status`, le code exact : 200 trouvé, 404 absent, 500 panne du serveur.
- Si `reponse.ok` est faux, levez une `Error` dont le message contient le code
  et l'URL : `"HTTP 404 sur donnees/quartier.json"`.

Appeler `json()` sans vérifier le code, c'est tenter de décoder une page
d'erreur comme si elle contenait vos données : le message obtenu ne parlera pas
du tout du vrai problème.

**`chargerQuartier(url, fetchFn = fetch)`** charge le quartier et le valide
avant de le renvoyer. Elle lève une `Error` dont le message commence par
`"quartier invalide : "` si :

- `largeur` ou `hauteur` n'est pas un entier strictement positif,
- `plan` n'a pas exactement `hauteur` lignes,
- une ligne de `plan` ne fait pas exactement `largeur` caractères,
- la pizzeria n'a pas de coordonnées entières, est hors carte, ou est posée sur
  un immeuble.

Pourquoi tant de contrôles : un fichier peut avoir été mal édité, et un plan qui
ment sur ses dimensions ferait planter l'affichage bien plus loin, avec un
message sans rapport. On refuse tout de suite, en disant quoi.

**`chargerCommandes(url, fetchFn = fetch)`** renvoie une liste d'instances de
`Commande`, pas les objets bruts du JSON, qui n'ont ni `nbPizzas` ni `toString`.

**Le paramètre `fetchFn`.** Les trois fonctions reçoivent un paramètre `fetchFn`
dont la valeur par défaut est `fetch`. En jeu, personne ne le passe : c'est le
`fetch` du navigateur qui sert. Dans les tests, on passe un faux `fetch` qui
renvoie des réponses fabriquées, sans réseau ni serveur :

```js
function fauxFetch(status, corps) {
  return async (url) => new Response(JSON.stringify(corps), { status });
}

await assert.rejects(chargerJson("nulle-part.json", fauxFetch(404, {})), /404/);
```

Ce procédé s'appelle l'**injection de dépendance** : au lieu d'aller chercher
lui-même ce dont il a besoin, le code le reçoit en paramètre, et le test peut
donc lui donner autre chose. C'est ce qui rend une fonction réseau testable en
quelques millisecondes, hors ligne, et de façon reproductible. Le montage
complet est en haut de `tests/test_3_jeu.js`.

### 9.2 La classe `Partie`

`Partie` garde l'état du jeu et applique les règles de la
[section 2](#2-les-règles-du-jeu).

| Élément | À faire |
| --- | --- |
| `constructor(quartier, coursiers)` | `this.tick` à 0, `this.score` à 0, `this.enAttente` et `this.livrees` à `[]`. Lève une `Error` si le quartier manque ou si la liste de coursiers est vide |
| `ajouterCommande(commande)` | met la commande à la fin de la file d'attente |
| `assigner()` | fait partir les coursiers ; renvoie `[{coursier, commande}]` |
| `avancer()` | fait passer un tour ; renvoie `[{coursier, commande, points}]` |
| `tour()` | `assigner()` puis `avancer()` ; renvoie `{affectations, livraisons}` |
| `points(commande)` | `(30 - délai) x nbPizzas`, jamais moins de zéro, avec `délai = livreeAu - creeeAu` |

**`ajouterCommande`** ajoute la commande à la fin de la file : premier arrivé,
premier servi. Elle lève une `Error` contenant `inaccessible` si la destination
n'est pas atteignable depuis la pizzeria, et dans ce cas la commande n'entre pas
dans la file.

**`assigner`** parcourt la file dans l'ordre et confie chaque commande au
coursier libre le plus proche, avec son itinéraire. S'il n'y a plus personne de
libre, la commande reste dans la file pour le tour suivant.

**`avancer`** augmente `this.tick` de 1, fait avancer chaque coursier en route,
et pour chacun qui arrive : il livre, la commande reçoit son `livreeAu`, les
points sont calculés et ajoutés au score, la commande rejoint `this.livrees`.

**`Partie` ne lit aucun fichier et n'affiche rien.** Elle reçoit un quartier et
des coursiers déjà construits. C'est ce qui permet aux tests de jouer des
parties entières sans navigateur, en quelques millisecondes.

### 9.3 Si une notion vous manque

| Notion | Ressource |
| --- | --- |
| les promesses | [Utiliser les promesses](https://developer.mozilla.org/fr/docs/Web/JavaScript/Guide/Using_promises) |
| `async` et `await` | [`async function`](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Statements/async_function), [`await`](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Operators/await) |
| faire une requête HTTP | [Utiliser `fetch`](https://developer.mozilla.org/fr/docs/Web/API/Fetch_API/Using_Fetch), [`Response`](https://developer.mozilla.org/fr/docs/Web/API/Response) |
| 404, 500 et les autres | [Les codes de statut HTTP](https://developer.mozilla.org/fr/docs/Web/HTTP/Status) |
| le JSON | [Travailler avec JSON](https://developer.mozilla.org/fr/docs/Learn/JavaScript/Objects/JSON) |
| pourquoi un serveur local | [Les modules JavaScript](https://developer.mozilla.org/fr/docs/Web/JavaScript/Guide/Modules) |
| attraper une erreur | [`try...catch`](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Statements/try...catch) |

**L'étape est finie quand** les 15 tests de `etape 3 : jeu` sont au vert et que
le jeu se joue en entier dans le navigateur, jusqu'au message
`Service termine`. Faites un commit.

---

## 10. Étape 4 : vos propres tests

**Fichier** : `tests/test_4_les_votres.js`.

Écrivez au moins deux tests qui vérifient un comportement non couvert par les
tests fournis. Le fichier contient déjà les `import` nécessaires et un modèle
commenté.

Un bon test :

- porte sur un seul comportement précis ;
- tient en quelques lignes ;
- porte un nom qui énonce ce qu'il vérifie, du genre « un coursier libre ne
  bouge pas », et non ce qu'il appelle, du genre « test avancer 2 » ;
- échoue si on casse le comportement qu'il vérifie. Vérifiez-le en cassant
  volontairement votre code pendant une minute.

Privilégiez les cas limites, là où les bugs se cachent :

- une carte d'une seule case ;
- un chemin dont la longueur vaut exactement la vitesse du coursier ;
- une commande dont la destination est la pizzeria elle-même ;
- une partie où personne ne peut livrer : le score bouge-t-il ?
- une commande livrée très en retard : les points tombent-ils bien à zéro sans
  devenir négatifs ?

```js
test("un coursier arrive en un coup si le chemin fait sa vitesse", () => {
  const velo = new Velo("Ana", { x: 0, y: 0 });
  velo.charger(new Commande(1, { x: 2, y: 0 }, ["Reine"]),
               [{ x: 1, y: 0 }, { x: 2, y: 0 }]);
  assert.equal(velo.avancer(), true);
});
```

---

## 11. L'architecture du projet (MVC)

Le projet est découpé en trois rôles, et ce découpage est évalué.

| Rôle | Fichiers | Ce qu'il fait | Ce qu'il ne fait jamais |
| --- | --- | --- | --- |
| **Modèle** | `modeles.js`, `algos.js`, `jeu.js` | détient l'état et les règles | afficher, connaître le navigateur |
| **Vue** | `vue.js` (fourni) | affiche une partie | modifier la partie, connaître les règles |
| **Contrôleur** | `main.js` (fourni) | charge les données, écoute les boutons, fait avancer le modèle | calculer quoi que ce soit |

La vue et le contrôleur sont fournis et courts. Les lire fait partie du travail :
c'est là que vous verrez comment vos fonctions sont réellement utilisées, et
comment un tour de jeu est déclenché.

À quoi sert cette séparation, concrètement :

- les 43 tests jouent des parties entières sans navigateur, parce que le modèle
  n'en dépend pas ;
- on pourrait remplacer l'affichage par un affichage en console sans toucher aux
  règles.

Deux signaux d'alarme : un appel à `document` dans `jeu.js`, ou une règle de
score dans `vue.js`. Dans les deux cas, le code est au mauvais endroit.

---

## 12. Ce qui est attendu au rendu

### 12.1 La liste de vérification

Vous rendez le dépôt que vous avez récupéré, avec la même structure de dossiers,
vos quatre fichiers complétés et votre historique de commits. Rien à renommer,
rien à déplacer, rien à zipper autrement.

- [ ] Les 43 tests fournis passent, sans qu'aucun test fourni ait été modifié.
- [ ] Le jeu se joue entièrement dans le navigateur, jusqu'au message de fin de
      service.
- [ ] Au moins deux tests personnels pertinents dans
      `tests/test_4_les_votres.js`.
- [ ] La complexité de `plusCourtChemin` est écrite et justifiée en commentaire.
- [ ] Les règles de codage de la [section 6](#6-conventions-et-règles-de-codage)
      sont respectées : pas de mutation d'arguments, erreurs signalées par des
      exceptions au message explicite, données externes validées.
- [ ] Le dépôt Git contient un commit par étape terminée, avec un message qui
      décrit ce qui fonctionne, du genre
      `etape 2 : algos, BFS et choix du coursier, 28 tests au vert`.
- [ ] Le code est lisible : noms explicites, fonctions courtes, commentaires là
      où l'intention n'est pas évidente à la lecture.

### 12.2 Barème indicatif

| Critère | Poids |
| --- | --- |
| Étape 1, modèles et héritage, 15 tests | 20 % |
| Étape 2, algorithmes, dont le parcours en largeur, 13 tests | 25 % |
| Étape 3, réseau, validation et règles du jeu, 15 tests | 25 % |
| Étape 4, pertinence des tests personnels | 10 % |
| Qualité du code : lisibilité, respect des règles de la section 6 | 15 % |
| Complexité justifiée, historique Git propre | 5 % |

Un projet dont les tests passent mais dont le code viole les règles de la
section 6, par exemple en modifiant ses arguments ou en avalant les erreurs, ne
peut pas prétendre à la totalité des points : les tests vérifient le
comportement, pas la qualité.

---

## 13. Problèmes courants

| Symptôme | Cause probable | Solution |
| --- | --- | --- |
| Page blanche, erreur de module dans la console | `jeu.html` a été ouvert directement, en `file://` | Servir le dossier par HTTP, voir la [section 4](#4-mise-en-route-5-minutes) |
| Le jeu affiche une erreur dès le chargement | Normal tant que toutes les fonctions ne sont pas écrites | Le message nomme la première fonction manquante : c'est votre prochaine étape |
| « attendu X, obtenu Y » sans que la différence saute aux yeux | Ordre des clés, chaîne au lieu d'un nombre, ou `x` et `y` inversés | Comparer les deux lignes caractère par caractère |
| Les positions sont décalées sur la carte | `plan` indexé dans le mauvais sens | C'est `plan[y][x]` : ligne d'abord, colonne ensuite |
| Les tests passent, mais le jeu se comporte mal | Une fonction modifie ses arguments | Vérifier les copies : `[...liste]`, `{ x: p.x, y: p.y }` |
| Un test attend une erreur et n'en reçoit pas | Vous renvoyez `null` au lieu de lever une exception | Voir la [section 6.3](#63-une-anomalie-se-signale-par-une-exception) |
| « son message ne contient pas ... » | Le mot-clé attendu manque dans votre message d'erreur | Les mots exigés sont `deja`, `rien`, `arrive`, `inaccessible`, `quartier invalide` |
| `plusCourtChemin` renvoie un chemin trop long | Vous marquez les cases comme visitées trop tard | Une case se marque au moment où on la met dans la file, pas quand on la sort |
| La partie ne se termine jamais | Une commande impossible est restée dans la file | `ajouterCommande` doit la refuser à l'entrée |
| Le mauvais coursier part | Vous comparez les vitesses au lieu des distances | La règle est « le moins de cases à faire », pas « le plus rapide » |
| `npm test` : commande introuvable | Node n'est pas installé | Utiliser `tests.html` dans le navigateur, avec le serveur local |

---

## 14. Ressources par notion

Toutes ces pages sont en français, sauf mention contraire. N'y allez que si la
notion vous manque : le sujet et le squelette contiennent déjà ce qu'il faut
pour avancer.

**Objet et classes**
[Les classes](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Classes),
[`constructor`](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Classes/constructor),
[`extends`](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Classes/extends),
[`super`](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Operators/super),
[accesseurs `get`](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Functions/get)

**Erreurs**
[`throw`](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Statements/throw),
[`Error`](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Error),
[`try...catch`](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Statements/try...catch)

**Tableaux, objets, chaînes**
[`filter`](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array/filter),
[`map`](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array/map),
[`push`](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array/push),
[`shift`](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array/shift),
[décomposition](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Operators/Spread_syntax),
[gabarits de chaîne](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Template_literals),
[`localeCompare`](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/String/localeCompare),
[`Math.max`](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Math/max)

**Collections**
[`Map`](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Map),
[`Set`](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Set)

**Algorithmique**
[Parcours en largeur](https://fr.wikipedia.org/wiki/Algorithme_de_parcours_en_largeur),
[introduction visuelle au pathfinding, en anglais](https://www.redblobgames.com/pathfinding/a-star/introduction.html),
[algorithme de Dijkstra](https://fr.wikipedia.org/wiki/Algorithme_de_Dijkstra)

**Asynchrone et réseau**
[Utiliser les promesses](https://developer.mozilla.org/fr/docs/Web/JavaScript/Guide/Using_promises),
[`async function`](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Statements/async_function),
[`await`](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Operators/await),
[`fetch`](https://developer.mozilla.org/fr/docs/Web/API/Fetch_API/Using_Fetch),
[`Response`](https://developer.mozilla.org/fr/docs/Web/API/Response),
[codes de statut HTTP](https://developer.mozilla.org/fr/docs/Web/HTTP/Status),
[travailler avec JSON](https://developer.mozilla.org/fr/docs/Learn/JavaScript/Objects/JSON)

**Organisation du code**
[Les modules JavaScript](https://developer.mozilla.org/fr/docs/Web/JavaScript/Guide/Modules),
[MVC](https://developer.mozilla.org/fr/docs/Glossary/MVC)

---

## 15. Pour aller plus loin (facultatif)

À traiter seulement une fois les 43 tests au vert, dans l'ordre que vous voulez.
Écrivez un test pour chaque extension que vous ajoutez.

Les trois premières remettent dans le jeu des règles qui en ont été retirées
pour le garder simple. Elles se font entièrement dans votre code, sans toucher
aux tests fournis.

| Extension | Ce qu'elle demande |
| --- | --- |
| **Le coffre est limité** : donnez une capacité à chaque coursier, deux pizzas pour un vélo, cinq pour un scooter. Un coursier ne prend plus une commande trop grosse pour lui, et une commande que personne ne peut porter est refusée à l'entrée | ajouter un accesseur `capacite` aux trois classes, filtrer les candidats, et gérer le nouveau refus |
| **Les commandes urgentes d'abord** : au lieu de servir dans l'ordre d'arrivée, rangez la file par ancienneté, puis par nombre de pizzas décroissant à ancienneté égale | écrire une fonction de tri à deux critères, sans modifier la liste reçue |
| **Le plus rapide, pas le plus proche** : choisissez le coursier dont le temps estimé est le plus court, soit le nombre de cases divisé par sa vitesse, arrondi à l'entier supérieur | un scooter loin peut alors battre un vélo proche : comparez les deux stratégies sur le même service |
| **Le client s'impatiente** : au bout de quarante tours sans livraison, la commande est annulée et retire des points | gérer le temps dans la boucle de jeu |
| **Des rues lentes** : un nouveau caractère du plan désigne une case qui coûte deux tours. Les arêtes n'ayant plus le même coût, le parcours en largeur ne suffit plus, et l'algorithme de Dijkstra reprend le même parcours avec une file ordonnée par coût cumulé | comprendre la limite d'un algorithme |
| **Un nouveau coursier** : une trottinette, deux cases par tour. Quelques lignes si votre héritage de l'étape 1 est correct | vérifier la qualité de votre hiérarchie de classes |
| **Une carte cliquable** : un clic sur une case libre y crée une commande | modifier la vue et le contrôleur |
| **Votre quartier** : `donnees/quartier.json` est un dessin en caractères, modifiable et agrandissable à volonté | manipuler des données |
