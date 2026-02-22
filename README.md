# Lancer le projet

## Dev

Aller a la racine du projet, lancer :
```bash
docker compose -f docker-compose-dev.yaml up
```

Lancer Docker desktop parce qu'on avait oublié, re-lancer : 

```bash
docker compose -f docker-compose-dev.yaml up
```

Aller sur [http://localhost:3000](http://localhost:3000)

## Prod

```bash
docker compose -f docker-compose-prod.yaml up
```

# Attentes du cours

## La menace étudiée
Exemple : suivi par cookie, tracking pixel, analyse des T&C.

## Les données observées
Quelles données sont collectées ? À quel moment ? Par quel mécanisme ?
Lors :
- de la connection
- du téléchargement
  

## Les implications
Qu’est-ce que ces données permettent de faire (Profilage ? Corrélation ? Suivi dans le temps ?) ?

## Les limites de votre démonstration
Ce que votre application ne montre pas ou simplifie.

## Jeu de tests / scénarios reproductibles
Vous devez fournir des scénarios clairs que quelqu’un d’autre peut reproduire.
Exemple :
1. Ouvrir la page.
2. Cliquer sur « Refuser les cookies ».
3. Observer les données stockées.
4. Recharger la page.
5. Cliquer sur « Tout accepter ».
6. Cliquer sur un bouton « Comparer »
7. Comparer les scénarios.

Ces scénarios doivent montrer des différences observables