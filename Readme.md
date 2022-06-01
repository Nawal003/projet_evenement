# Documentation API pour gestion_evenements

# Liste des routes disponibles
# Toutes les routes commencent par /api
  

## Route POST /user

    Body : 
    {
    	email: "example@email.com",
    	mdp: "monmotdepassesecret",
    	nom: "monnom",
    	prenom: "monprenom"
    }

## Route POST /login

    Body : 
    {
    	email: "example@email.com",
    	mdp: "monmotdepassesecret"
    }

## Route GET /evenements

## Route GET /evenement/:id

## Route DELETE /evenement/participant/:idEvent/:idParticipant