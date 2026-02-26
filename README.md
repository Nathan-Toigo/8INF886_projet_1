# Lancer le projet

## Prérequis

Avoir Docker Desktop d'installé de de lancé.

## Dev

Aller a la racine du projet, lancer :
```bash
wsl
make up-dev

OU

docker compose -f docker-compose-dev.yaml up
```

Aller sur [http://localhost:3000](http://localhost:3000)

## Prod

```bash
wsl
make up-dev-build

OU

docker compose -f docker-compose-prod.yaml up
```

# Attentes du cours

## La menace étudiée
**Exemple : suivi par cookie, tracking pixel, analyse des T&C.**

## Les données observées
**Quelles données sont collectées ? À quel moment ? Par quel mécanisme ?**

Lors de :
- La connection / déconnection
- La navigation sur le site
  

## Les implications
**Qu’est-ce que ces données permettent de faire (Profilage ? Corrélation ? Suivi dans le temps ?) ?**

Suivi dans le temps

## Les limites de votre démonstration
**Ce que votre application ne montre pas ou simplifie.**

## Jeu de tests / scénarios reproductibles
**Vous devez fournir des scénarios clairs que quelqu’un d’autre peut reproduire.**
Exemple :
1. Aller sur le site
2. Se connecter avec un identifiant (ex : login:arno password:arno)
3. Cliquer sur le boutton Chat sur la navbar
4. // Potentiellement rajouter l'envoie de messages
5. Cliquer sur le boutton Settings sur la navbar
6. // Potentiellement rajouter le changement de settings (Ex mode sombre, changement de mdp)
7. Cliquer sur le boutton Log Out sur la navbar

**Ces scénarios doivent montrer des différences observables**