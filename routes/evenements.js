const express = require("express");
const router = express.Router();
const db = require("../services/db");
const jwtModule = require("../middlewares/jwt");


/** Récupérer tous les événements */
router.get("/evenements", async (req, res, next) => {
  // const event = evenements.getEvenement().then((res) => {
  //   console.log("res===>", res);
  // });
  const idParticipant = req.body.idParticipant;

  const rows = db.query(
    `SELECT Evenement.idEvenement, Evenement.titre, Evenement.date, Evenement.image, Lieu.nomLieu, Lieu.ville, Organisateur.nomOrganisateur, (Evenement.nbPlaces - COUNT(Participant_Evenement.idEvenement)) AS "placesRestantes", CASE 
    WHEN (SELECT idParticipant FROM Participant_Evenement WHERE idParticipant = "${idParticipant} "
        AND Participant_Evenement.idEvenement = Evenement.idEvenement) IS NULL THEN "non-inscrit" 
        ELSE "inscrit" END as "inscription"
    FROM Evenement 
    JOIN Organisateur ON Evenement.idOrganisateur = Organisateur.idOrganisateur
    JOIN Lieu ON Evenement.idLieu = Lieu.idLieu
    LEFT JOIN Participant_Evenement ON Evenement.idEvenement = Participant_Evenement.idEvenement
    GROUP BY Evenement.idEvenement `,
    (err, result, fields) => {
      //   console.log("error====>", err);
      console.log("result====>", result);
      //   console.log("result length====>", result.length);
      try {
        res.status(200).json({
          evenements: result,

          message: "Evenements fetched successfully !!!",
        });
      } catch (error) {
        res.status(404).json({ error, messsage: "Demmerde-toi !" });
      }
    }
  );
});

/** Récupérer un événement par id */
router.get("/evenement/:id", async (req, res, next) => {
  let idEvenement = req.params.id;
  const eventById = db.query(
    `SELECT evenement.description , evenement.titre, evenement.date, Evenement.nbPlaces, Evenement.image, Lieu.nomLieu, Lieu.ville, Organisateur.nomOrganisateur, (Evenement.nbPlaces - COUNT(Participant_Evenement.idEvenement)) AS "placesRestantes", CASE WHEN (SELECT idParticipant FROM Participant_Evenement WHERE idParticipant = 700 AND Participant_Evenement.idEvenement = Evenement.idEvenement) IS NULL THEN "non-inscrit" ELSE "inscrit" END as "inscription"
  FROM evenement 
  JOIN Organisateur ON Evenement.idOrganisateur = Organisateur.idOrganisateur
  JOIN Lieu ON Evenement.idLieu = Lieu.idLieu
  LEFT JOIN Participant_Evenement ON Evenement.idEvenement = Participant_Evenement.idEvenement
  WHERE evenement.idEvenement =  ${idEvenement}
  GROUP BY Evenement.idEvenement
  `,

    (err, result, fields) => {
      if (req.params.id == null || undefined) {
        return res.status(403).json({ message: "Invalid id" });
      }
      //   console.log("error====>", err);
      console.log("result====>", result);
      //   console.log("result length====>", result.length);
      try {
        res.status(200).json({
          evenementId: result,
          message: "Evenement fetched successfully !!!",
        });
      } catch (error) {
        res.status(404).json({ error, messsage: "Demmerde-toi !" });
      }
    }
  );
});

/** Récupérer les événements auxquels un user est inscrit */
router.get('/evenements/participant/:id', jwtModule.authenticateToken, (req, res) => {
  if(req.params.id == undefined || null) res.status(401).send({message: 'Invalid id'});
  const query = `SELECT evenement.idEvenement, evenement.description , evenement.titre, evenement.date, Evenement.nbPlaces, Evenement.image, Lieu.nomLieu, Lieu.ville, Organisateur.nomOrganisateur
  FROM evenement 
  JOIN Organisateur ON Evenement.idOrganisateur = Organisateur.idOrganisateur
  JOIN Lieu ON Evenement.idLieu = Lieu.idLieu
  LEFT JOIN Participant_Evenement ON Evenement.idEvenement = Participant_Evenement.idEvenement
  WHERE Participant_Evenement.idParticipant =  ${req.params.id}
  GROUP BY Evenement.idEvenement;`;
  db.query(query, (err, result) => {
    if (err) res.status(403).send(err.sqlMessage);
    if (result) res.send({ message: "Evénements récupérés", evenements: result });
  });
});

/** Créer un événement */
router.post('/evenement', jwtModule.authenticateToken, (req, res) => {
  let titre = req.body.titre;
  let date = req.body.date;
  let nbPlaces = req.body.nbPlaces;
  let description = req.body.description;
  let image = req.body.image;
  let idLieu = req.body.idLieu;
  let idOrganisateur = req.body.idOrganisateur;

  // requête sql
  const query = `INSERT INTO evenement (titre, date, nbPlaces, description, image, idLieu, idOrganisateur) VALUES ("${titre}", "${date}", "${nbPlaces}", "${description}", "${image}", "${idLieu}", "${idOrganisateur}")`;
  db.query(query, (err, result) => {
    if (err) res.status(403).send(err.sqlMessage);
    if (result) res.send({ message: "Evénement créé" });
  });
});

/** S'inscrire à un événement */
router.post('/evenement/participant/:idEvent/:idParticipant', jwtModule.authenticateToken, (req, res) => {
  const query = `INSERT INTO participant_evenement (idParticipant, idEvenement) VALUES ("${req.params.idParticipant}", "${req.params.idEvent}")`;
  db.query(query, (err, result) => {
    if (err) res.status(403).send(err.sqlMessage);
    if (result) res.send({ message: "Inscription à l'événement validée" });
  })
});

/** Se désinscrire d'un événement */
router.delete(
  "/evenement/participant/:idEvent/:idParticipant", jwtModule.authenticateToken,
  (req, res, next) => {
    let idParticipant = req.params.idParticipant;
    let idEvent = req.params.idEvent;

    const deleteEvent = db.query(
      `DELETE FROM participant_evenement WHERE idParticipant=${idParticipant} AND idEvenement=${idEvent}`,

      (err, result, fields) => {
        if ((idParticipant || idEvent) == null || undefined) {
          return res.status(403).json({ message: "Invalid id" });
        }
        //   console.log("error====>", err);
        console.log("result====>");
        //   console.log("result length====>", result.length);
        try {
          res.status(200).json({
            message: "Inscription deleted successfully !!!",
          });
        } catch (error) {
          res.status(404).json({ error, messsage: "Démmerde-toi !" });
        }
      }
    );
  }
);

/** Modifier un événement */
router.put('/evenement/:id', jwtModule.authenticateToken,  (req, res) => {
  if(req.body.titre == null || undefined) {res.status(401).send({message : "Titre manquant"}); return};
  if(req.body.date == null || undefined) {res.status(401).send({message : "Date manquante"}); return};
  if(req.body.nbPlaces == null || undefined) {res.status(401).send({message : "Nombre de places manquant"}); return};
  if(req.body.description == null || undefined) {res.status(401).send({message : "Description manquante"}); return};
  if(req.body.image == null || undefined) {res.status(401).send({message : "Url de l'image manquante"}); return};
  if(req.body.idLieu == null || undefined) {res.status(401).send({message : "Id du lieu manquant"}); return};
  if(req.body.idOrganisateur == null || undefined) {res.status(401).send({message : "Id de l'organisateur manquant"}); return};
  let titre = req.body.titre;
  let date = req.body.date;
  let nbPlaces = req.body.nbPlaces;
  let description = req.body.description;
  let image = req.body.image;
  let idLieu = req.body.idLieu;
  let idOrganisateur = req.body.idOrganisateur;
  const query = `UPDATE participant SET titre = "${titre}", date = "${date}", nbPlaces = "${nbPlaces}", description = "${description}", image = "${image}",  idLieu = "${idLieu}", idOrganisateur = "${idOrganisateur}" WHERE idEvenement = '${req.params.id}'`;
  db.query(query, (err, result) => {
      if (err) res.status(403).send(err.sqlMessage);
      if (result) res.send({ message: "User modifié" });
  })
});

/** Supprimer un événement */
router.delete('/evenement/:id', jwtModule.authenticateToken, (req, res) => {
  const query = `DELETE FROM evenement WHERE idEvenement = '${req.params.id}'`;
  db.query(query, (err, result) => {
    if (err) res.status(403).send(err.sqlMessage);
    if (result) res.send({ message: "User supprimé" });
  })
});

module.exports = router;
