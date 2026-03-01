<div align="center">
    <img src="8inf886_projet_1/public/logo_bright.png" alt="alt text" width="60%">
</div>

# 🚀 Lancer le projet

## ✅ Prérequis

Avoir Docker Desktop installé et lancé.

## 🛠️ Environnement de développement (Dev)

À la racine du projet, lancer :

### Linux (ou WSL)

```bash
make up-dev
```

### Windows

```bash
docker compose -f docker-compose-dev.yaml up
```

Puis ouvrir : [http://localhost:3000](http://localhost:3000)

## 📦 Environnement de production (Prod)

### Linux (ou WSL)

```bash
make up-dev-build
```

### Windows

```bash
docker compose -f docker-compose-prod.yaml up
```

Si l’installation ou le lancement du projet pose problème, une version est disponible à cette adresse :  
[http://k4scccwscgs4wwk880k0ooww.173.249.2.58.sslip.io/](http://k4scccwscgs4wwk880k0ooww.173.249.2.58.sslip.io/)

## 🔐 Connexion

Les deux utilisateurs existants sont les suivants (le respect de la casse est important) :

| User | Password |
|------|----------|
| baba | baba     |
| toto | toto     |

---

# 🎓 Attentes du cours

## 🧩 La menace étudiée

**Exemple : suivi par cookie, tracking pixel, analyse des T&C.**

Suivi par cookie.

## 👀 Les données observées

**Quelles données sont collectées ? À quel moment ? Par quel mécanisme ?**

Collecte lors de :
- la connexion / déconnexion ;
- la navigation sur le site.

## 📈 Les implications

**Qu’est-ce que ces données permettent de faire (profilage ? corrélation ? suivi dans le temps ?) ?**

Suivi dans le temps.

## ⚠️ Les limites de votre démonstration

**Ce que votre application ne montre pas ou simplifie.**

L’application ne montre pas l’utilisation de ces données : elle ne fait que les collecter.  
La collecte se fait uniquement en local, via le `LocalStorage` du navigateur.

Le nombre d’actions observées est volontairement restreint : navigation et connexion/déconnexion de l’utilisateur.  
D’autres actions, comme l’envoi de messages ou la modification de paramètres, auraient pu être envisagées, mais n’ont pas été implémentées par contrainte de temps (pour un fonctionnement similaire au reste).

## 🧪 Jeu de tests / scénarios reproductibles

**Vous devez fournir des scénarios clairs que quelqu’un d’autre peut reproduire.**

### Scénario 1 : Accepter les cookies

1. Aller sur le site.
2. Cliquer sur le bouton **"Accept"** du bandeau inférieur.
3. Se connecter avec un identifiant (ex. : `login:baba password:baba`).
4. Naviguer sur d’autres pages de la navbar.
5. Cliquer sur le bouton **Logs** de la navbar (les actions précédemment faites sont visibles).
6. Cliquer sur le bouton **Log Out** de la navbar.
7. Se connecter avec un autre identifiant (ex. : `login:toto password:toto`).
8. Naviguer sur d’autres pages de la navbar.
9. Cliquer sur le bouton **Logs** de la navbar (les actions précédentes sont visibles, incluant celles faites par l’autre utilisateur).
10. Cliquer sur le bouton **"Vider mes logs"**.
11. Naviguer sur d’autres pages de la navbar.
12. Cliquer sur le bouton **Logs** de la navbar (seules les actions venant d’être faites sont présentes).
13. Cliquer sur le bouton **"Désactiver les cookies"**.
14. Cliquer sur le bouton **"Vider mes logs"**.
15. Naviguer sur d’autres pages de la navbar.
16. Cliquer sur le bouton **Logs** de la navbar (aucune action n’est présente dans le tableau).

### Scénario 2 : Refuser les cookies

1. Aller sur le site.
2. Cliquer sur le bouton **"Decline"** du bandeau inférieur.
3. Se connecter avec un identifiant (ex. : `login:toto password:toto`).
4. Naviguer sur d’autres pages de la navbar.
5. Cliquer sur le bouton **Logs** de la navbar (aucune action n’est visible).
6. Cliquer sur le bouton **"Activer les cookies"**.
7. Naviguer sur d’autres pages de la navbar.
8. Cliquer sur le bouton **Logs** de la navbar (les actions venant d’être faites sont présentes).