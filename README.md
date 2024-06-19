# SAE4.02
Le projet Choixpeau est une application interactive inspirée de l'univers de Harry Potter, où les utilisateurs répondent à une série de questions pour déterminer à quelle maison de Poudlard ils appartiennent. À travers des questions variées sur les valeurs, les préférences et les réactions face à différentes situations magiques, le projet utilise un algorithme pour attribuer une maison parmi Gryffondor, Serpentard, Serdaigle et Poufsouffle. 

1. **Offline Mode**: Permettre aux utilisateurs d'accéder au test même sans connexion Internet.(GOOD)
2. **Local Notifications**: Envoyer des notifications locales pour rappeler aux utilisateurs de terminer leur test ou de découvrir leur maison.(GOOD)
3. **Home Screen Installation**: Offrir la possibilité d'installer le site comme une application sur l'écran d'accueil de l'utilisateur.(GOOD)
4. **Speech Recognition**: Permettre aux utilisateurs de répondre aux questions en utilisant la reconnaissance vocale.(La aprise en charge des naviagateurs est nuls)

## Commencer

Ces instructions vous permettront d'obtenir une copie du projet opérationnel sur votre ordinateur local à des fins  de test.

### Demarrage du server

Met le projet dans un xampp puisqu'on va utiliser localhost.
Dans le terminnal de VSC écrit les ligne suivante :

```
cd server
npx nodemon app.js
```
Normalement dans le terminal (si tout ce passe bien) il y aura écrit : Server running on port 3000!
Puis ouvre les deux page suivante : [localhsot:3000](http://localhost:3000/) et [localhsot:3000/send-notification](http://localhost:3000/send-notification).

### Notification push

Une série d'exemples étape par étape qui vous expliquent comment faire fonctionner un environnement de développement

Dites quelle sera l'étape

```
Donne l'exemple
```

Et répétez

```
jusqu'à ce que ce soit fini
```

Terminez par un exemple d'extraction de données du système ou de leur utilisation pour une petite démonstration
