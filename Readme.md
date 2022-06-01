# Documentation API pour gestion_evenements

# Liste des routes disponibles
  

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