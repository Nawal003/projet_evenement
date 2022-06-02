# Documentation API pour gestion_evenements

# Liste des routes disponibles
# Lien de l'api : "https://api-evenement-cda.herokuapp.com/api";

## Token nécessaire pour toutes les routes PUT, DELETE, POST(sauf /user), et GET (user/:id, evenements/participant/:id)
  
## Se connecter
### Route POST /login

    Body : 
    {
    	email: "toto@toto.fr",
    	motDePasse: "tototest"
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

## Supprimer un utilisateur
### Route DELETE /user/:id


## Récupérer les événements
### Route GET /evenements

## Récupérer un évenement avec son id
### Route GET /evenement/:id

## Récupérer les événements auxquels est inscrit un user
### Route GET /evenements/participant/:idParticipant

## Créer un événement
### Route POST /evenement
	{
		titre: "titreEvent",
		date: Date,
		nbPlaces: 100,
		description: "Super événement",
		image: "urldel'image",
		idLieu: 3,
		idOrganisateur: 4
	}

## S'inscrire à un événement
### Route POST /evenement/participant/:idEvent/:idParticipant

## Se désinscrire
### Route DELETE /evenement/participant/:idEvent/:idParticipant

## Supprimer un événement
### Route DELETE /evenement/:id



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

## Supprimer un lieu
### Route DELETE /lieu/:id


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

## Supprimer un organisateur
### Route DELETE /organisateur/:id