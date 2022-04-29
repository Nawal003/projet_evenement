const db = require("./db");
// const connect = require("../middlewares/connect");

async function getEvenement() {
  const idParticipant = 1;
  const rows = db.query(
    `SELECT Evenement.titre, Evenement.date, Evenement.image, Lieu.nomLieu, Lieu.ville, Organisateur.nomOrganisateur, (Evenement.nbPlaces - COUNT(Participant_Evenement.idEvenement)) AS "placesRestantes", CASE 
    WHEN (SELECT idParticipant FROM Participant_Evenement WHERE idParticipant = ${idParticipant} 
        AND Participant_Evenement.idEvenement = Evenement.idEvenement) IS NULL THEN "non-inscrit" 
        ELSE "inscrit" END as "inscription"
    FROM Evenement 
    JOIN Organisateur ON Evenement.idOrganisateur = Organisateur.idOrganisateur
    JOIN Lieu ON Evenement.idLieu = Lieu.idLieu
    LEFT JOIN Participant_Evenement ON Evenement.idEvenement = Participant_Evenement.idEvenement
    GROUP BY Evenement.idEvenement `,
    (err, result, fields) => {
      //   console.log("error====>", err);
      //   console.log("result====>", result);
      //   console.log("result length====>", result.length);
      return result;
    }
  );
}

module.exports = { getEvenement };
