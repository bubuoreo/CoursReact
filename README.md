# ASI2 Atelier 2

## Noms des membres du groupe

- Alexandre BURLOT
- Adrien CORSETTI
- Tom DA ROLD
- Quentin MELERO

## Activités réalisées lors des séances

1. Alexandre BURLOT
Back-End : Implémentation du Chat
Back-End : Liaison entre le backend Spring Boot et Node.js pour récupérer la liste des utilisateurs via Web service 
Back-End : Implémentation du service permettant d’associer des joueurs souhaitant jouer entre eux et implémentation de la logique de jeu
Back-End : Mise à jour du wallet de chaque joueur à l'issue du résultat d’une partie

2. Adrien CORSETTI
Front-End de l’atelier 1
Front-End de l’atelier 2
Liaison Back-End - Front-End de l’atelier 1 

3. Tom DA ROLD
Liaison Back-End - Front-End de l'atelier 1
Mise en place du Reverse Proxy
Mise en place de Redux dans le front
Front-End de l’atelier 2

4. Quentin MELERO
Back-End : Implémentation du Chat
Back-End : Liaison entre le backend Spring Boot et Node.js pour récupérer la liste des utilisateurs via Web service 
Back-End : Implémentation du service permettant d’associer des joueurs souhaitant jouer entre eux et  implémentation de la logique de jeu

## Lien vers le Repo GIT

- [Fonctionnement du jeu avec le chat en HTML static](https://github.com/bubuoreo/CoursReact/tree/int_chat)
- [Fonctionnement FrontEnd React avec l'intégration du chat](https://github.com/bubuoreo/CoursReact/tree/chat)

## Liste des éléments réalisés

Front-End :  
- Lien entre Back-End et Front-End de l’atelier 1  
- Mise en place de Redux  
- Mise en place du Reverse Proxy (NGINX)  
- BuyPage/SellPage fonctionnelles avec update de l’account du joueur  
- Création des pages et des composants de l’atelier 2  
- Création d’une page pour que le joueur sélectionne ses cartes pour jouer (4 cartes à choisir)  
- Création de la page de jeu avec une partie chat (seul le chat est relié avec le back-end)



Back-End :  
- Réalisation d’un backend Node.js indépendant de l’existant permettant de créer un chat entre deux utilisateurs ainsi qu’avec tous les utilisateurs connectés. Les utilisateurs peuvent choisir d' envoyer un message à tous les utilisateurs ou bien ils peuvent choisir un destinataire afin que seul le destinataire reçoivent le message.  
- Mise à jour de l’application afin de pouvoir récupérer la liste des utilisateurs via requête à HTTP vers le User Web service sur l’application Spring Boot.  
- Réalisation d’un backend en node.js d’un service permettant d’associer les utilisateurs souhaitant jouer entre eux.  
- Réalisation d’un backend en node.js qui implémente toute la logique du jeu selon notre diagramme de séquences.  
- Informer le BackEnd Spring Boot gérant les utilisateurs et les cartes du résultat du jeu par Bus de communication pour la mise à jour du wallet de chaque joueur.  
- Intégration du chat du BackEnd node.js (P2P et Broadcast) dans l’application React

## Liste des éléments non-réalisés
- Liaison entre le Front-End et le Back-End de l’atelier 2 (Jeu)
- Sauvegarde de l’historique des conversations du Chat en envoyant les données du backend node.js vers le backend Spring Boot qui stockera ces informations.
- Création d’un BackEnd indépendant (Spring Boot) permettant de logger l’ensemble des messages transmis sur le bus de communication.
- Mise en place d’un proxy permettant de rediriger les requêtes http entre les 2 backends : Springboot et Node.js

## Lien vers vidéos Youtube
- Vidéo explicative du fonctionnement du back-end Node js pour la gestion du chat et du jeu : https://youtu.be/OoR9jIAs1uw
- Vidéo explicative du fonctionnement du front-end: https://youtu.be/HyowEwLgVwM

## Consignes pour utiliser notre application
Il y a 5 éléments à mettre en marche:  
- Serveur SpringBoot: `Run CardMngMonolithicApplication.java`
- Serveur NodeJS: `node app.js`
- Serveur Vite: `npm run dev -- --host`
- nginx: `sudo docker run --name asi2-nginx-container -p 80:80 -v /Users/adriencorsetti/Desktop/CrsReact/atelier-app/nginx.conf:/etc/nginx/nginx.conf:ro --rm nginx (à adapter en fonction du système d’exploitation et du nom du fichier nginx)`
- ActiveMQ: `docker run -it -p 61616:61616 -p 61613:61613 -p 8161:8161 -e ACTIVEMQ_DISALLOW_WEBCONSOLE=false -e ACTIVEMQ_USERNAME=myuser -e ACTIVEMQ_PASSWORD=mypwd -e ACTIVEMQ_WEBADMIN_USERNAME=myuserweb -e ACTIVEMQ_WEBADMIN_PASSWORD=mypwd symptoma/activemq:latest`

Aucun users n’est au préalable enregistré lors du lancement du serveur SpringBoot(utiliser le bouton Sign In pour accéder à la RegistrationPage).
L’icon Money en haut à gauche de l’écran permet de revenir à la HomePage sans changer le contexte.
