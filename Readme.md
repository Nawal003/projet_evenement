# Documentation API pour gestion_evenements

# Liste des routes disponibles
# Lien de l'api : "https://api-evenement-cda.herokuapp.com/api";
  
## Se connecter
### Route POST /login

    Body : 
    {
    	email: "toto@toto.fr",
    	mdp: "tototest"
    }

## Créer un utilisateur
### Route POST /user

    {
    	email: "example@email.com",
    	mdp: "monmotdepassesecret",
    	nom: "monnom",
    	prenom: "monprenom"
    }

## Récupérer les utilisateurs
### Route GET /users

## Récupérer un utilisateur avec son id
### Route GET /user/:id

## Modifier un utilisateur
### Route PUT/user/:id
    {
    	email: "example@email.com",
    	mdp: "monmotdepassesecret",
    	nom: "monnom",
    	prenom: "monprenom"
    }



## Récupérer les événements
### Route GET /evenements

## Récupérer un évenement avec son id
### Route GET /evenement/:id

## Se désinscrire
### Route DELETE /evenement/participant/:idEvent/:idParticipant



## Ajouter un lieu
### Route POST /lieu
  
    {
    	nom: "Zénith",
    	ville: "Pau"
    }

## Récupérer les lieux
### Route GET /lieux

## Récupérer un lieu avec son id
### Route GET /lieu/:id

## Modifier un lieu
### Route PUT /lieux/:id
    {
    	nom: "Zénith",
    	ville: "Pau"
    }



## Ajouter un organisateur
### Route POST /organisateur
  
    {
    	nom: "Jérôme",
    }

## Récupérer les organisateurs
### Route GET /organisateurs

## Récupérer un organisateur avec son id
### Route GET /organisateur/:id

## Modifier un organisateur
### Route PUT /organisateur/:id
    {
    	nom: "Gérald",
    }