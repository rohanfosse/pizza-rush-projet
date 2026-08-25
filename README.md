# Pizza Rush

Jeu de livraison de pizzas fonctionnant dans un navigateur, en HTML, CSS et
JavaScript, sans bibliotheque exterieure.

Le jeu en une phrase : des clients commandent des pizzas, vos coursiers partent
de la pizzeria et les livrent, et une livraison rapporte d'autant plus de points
qu'elle est rapide.

## Les trois pages du projet

| Page | A quoi elle sert |
| --- | --- |
| `index.html` | le sujet complet : les regles, les quatre etapes, les ressources |
| `jeu.html` | le jeu : la carte, les coursiers, le journal du service |
| `tests.html` | les 43 tests dans le navigateur |

Elles partagent la meme feuille de style et se repondent : la barre du haut
passe de l'une a l'autre.

Le sujet existe aussi en texte, pour le lire directement sur GitHub :
[SUJET.md](SUJET.md).

## Le projet en ligne

Publie avec GitHub Pages, rien a installer pour regarder :

- [le sujet](https://rohanfosse.github.io/pizza-rush-projet/)
- [le jeu](https://rohanfosse.github.io/pizza-rush-projet/jeu.html)
- [les tests](https://rohanfosse.github.io/pizza-rush-projet/tests.html)

La version en ligne montre l'etat de depart : le jeu s'arrete sur la premiere
fonction non ecrite, et les 43 tests sont rouges. C'est normal, c'est le point
de depart. Pour travailler, clonez le depot et lancez tout chez vous.

## Recuperer le projet

```bash
git clone https://github.com/rohanfosse/pizza-rush-projet.git
cd pizza-rush-projet
```

## Lancer le projet

Un serveur local est necessaire : un navigateur refuse de charger des modules
JavaScript depuis une adresse `file://`.

```bash
python -m http.server 8000     # ou : npx serve
```

Le sujet est alors sur `http://localhost:8000`, le jeu sur
`http://localhost:8000/jeu.html`, les tests sur
`http://localhost:8000/tests.html`.

Avec Node, les tests s'executent aussi en console :

```bash
npm test
```

Au premier lancement, les 43 tests echouent : c'est le point de depart.

## Ce qu'il y a a ecrire

Le squelette est fourni : toutes les fonctions existent, documentees, avec un
`// TODO` a la place du code. Pour voir ce qu'il reste a faire :

```bash
grep -rn "TODO" src/ tests/test_4_les_votres.js
```

| Etape | Fichier a ecrire | Notions | Tests |
| --- | --- | --- | --- |
| 1 | `src/modeles.js` | classes, heritage, validation | 15 |
| 2 | `src/algos.js` | grille, parcours en largeur, choix du coursier | 13 |
| 3 | `src/jeu.js` | fetch, codes HTTP, regles du jeu | 15 |
| 4 | `tests/test_4_les_votres.js` | ecriture de tests | 2 minimum |

`src/vue.js` et `src/main.js` sont fournis : ils constituent la vue et le
controleur, le reste du projet formant le modele. Les tests fournis ne se
modifient pas.

## Le projet est fini quand

- `npm test` affiche `43 tests, tout est vert.`,
- le service se joue jusqu'au message `Service termine` dans le navigateur,
- `tests/test_4_les_votres.js` contient au moins deux tests a vous.

La liste complete du rendu attendu se trouve en section 12 du sujet.
