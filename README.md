# 0 h 47 : Le dernier métro

Jeu d'aventure textuel à choix multiples, réalisé en HTML et CSS pour le TP d'initiation web.

**Auteur :** Prénom NOM (à compléter)

## Le jeu

Il est 0 h 47. Tu montes dans le dernier métro et tu t'endors deux minutes. Au réveil, la rame est vide, les stations défilent sans que le train s'arrête, et leurs noms n'existent sur aucun plan.

Le jeu est une histoire d'horreur où rien n'est expliqué. À chaque page, tu lis une scène et tu choisis entre deux actions. Tes choix mènent à l'une des quatre fins, dont une seule te ramène chez toi.

Deux indices sont cachés dans le texte de certaines scènes. Ils ne sont enregistrés nulle part : c'est au joueur de s'en souvenir au bon moment.

## Comment jouer

1. Télécharger ou cloner le dépôt.
2. Ouvrir le fichier `index.html` dans un navigateur.
3. Cliquer sur les boutons pour avancer dans l'histoire.

Deux remarques :

- **Le son** : les navigateurs bloquent le son tant que le joueur n'a pas cliqué sur la page. Il démarre donc au premier clic. Un bouton en haut à droite permet de le couper. Pour l'entendre dans les meilleures conditions, lancer le jeu avec un serveur local (par exemple l'extension Live Server de VS Code).
- **La police des titres** vient de Google Fonts et demande une connexion Internet. Sans connexion, une police de remplacement est utilisée.

## Contenu

- 14 pages interconnectées : 1 page d'accueil, 9 scènes et 4 fins.
- 2 routes distinctes dès le premier choix, qui ne se rejoignent qu'aux fins.
- Des boutons de choix personnalisés, chacun avec son icône.
- L'arbre de navigation complet se trouve dans `arbre-navigation.pdf`.

## Structure du projet

```
nom-tp-web/
├── index.html              Page d'accueil (Le quai)
├── style.css               Feuille de style commune à toutes les pages
├── script.js               Bonus : sons et compteur de fins
├── arbre-navigation.pdf    Arbre de navigation
├── README.md
├── pages/
│   ├── scene01.html        Le réveil
│   ├── scene02.html        Le passager
│   ├── scene03.html        Le wagon des affiches
│   ├── scene04.html        Ton double
│   ├── scene05.html        La cabine
│   ├── scene06.html        La station sans nom
│   ├── scene07.html        Le plan de ligne
│   ├── scene08.html        Le terminus
│   ├── scene09.html        Entre deux wagons
│   ├── scene10.html        Fin : le mauvais arrêt
│   ├── scene11.html        Fin : le passager
│   ├── scene12.html        Fin : le conducteur
│   └── scene13.html        Fin : 0 h 48
└── assets/
    ├── backgrounds/        Photos de fond
    ├── icons/              Icônes des boutons (SVG)
    └── sounds/             Ambiance et bruitages (MP3)
```

## Choix techniques

- **Un seul fichier CSS** pour tout le site : chaque page utilise la même structure HTML (`header`, `main`, `h1`, `p`, `nav`) et les mêmes classes.
- **Une classe par ambiance** (`bg-quai`, `bg-wagon`, `bg-station`...) placée sur le `body` pour changer la photo de fond sans dupliquer de code.
- **Navigation 100 % HTML** : le jeu se joue entièrement avec des liens. Le fichier `script.js` n'ajoute que des bonus, et le jeu fonctionne même s'il est désactivé.
- **Cadre de texte ancré en bas de l'écran** avec flexbox, pour que les boutons restent toujours visibles, y compris sur téléphone.

## Bonus réalisés

- **Animations CSS** : le titre grésille comme un néon, le texte sort lentement du noir, certains boutons tremblent au survol.
- **Anomalie visuelle** : un bouton est écrit à l'envers sur la station en miroir.
- **Sons** : un grondement de métro en boucle, et un bruitage différent pour chaque page (freins, respiration, néon, carillon...).
- **Score** : la page d'accueil affiche le nombre de fins découvertes sur 4. Ce compteur est gardé dans le navigateur du joueur : chaque personne qui ouvre le jeu commence à 0.
- **Police personnalisée** pour les titres (Special Elite, Google Fonts).

## Crédits

Les photos de fond viennent d'[Unsplash](https://unsplash.com) (licence Unsplash, utilisation libre). Elles ont été recadrées, assombries et retouchées pour le jeu.

Les icônes des boutons et tous les sons ont été créés pour le jeu.

Police des titres : Special Elite, via [Google Fonts](https://fonts.google.com).