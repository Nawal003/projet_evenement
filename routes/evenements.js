const express = require("express");
const router = express.Router();
// const evenements = require("../services/evenements");
const db = require("../services/db");

router.get("/evenements", async (req, res, next) => {
  // const event = evenements.getEvenement().then((res) => {
  //   console.log("res===>", res);
  // });
  const idParticipant = req.body.idParticipant;

  const rows = db.query(
    `SELECT Evenement.titre, Evenement.date, Evenement.image, Lieu.nomLieu, Lieu.ville, Organisateur.nomOrganisateur, (Evenement.nbPlaces - COUNT(Participant_Evenement.idEvenement)) AS "placesRestantes", CASE 
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
        res.status(404).json({ error, messsage: "Démerde-toi !" });
      }
    }
  );
});
router.get("/evenements/:id", async (req, res, next) => {
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
        res.status(404).json({ error, messsage: "Démmerde-toi !" });
      }
    }
  );
});

module.exports = router;
