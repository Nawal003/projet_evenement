const express = require("express");
const router = express.Router();
const db = require("../services/db");
const jwtModule = require("../middlewares/jwt");

router.post("/login", (req, res, next) => {
  let email = req.body.email;
  let motDePasse = req.body.motDePasse;
  const qy = `SELECT idParticipant, nom, prenom FROM participant WHERE email ="${email}" AND motDePasse ="${motDePasse}" `;
  console.log(qy);

  const rows = db.query(
    `SELECT idParticipant, nom, prenom FROM participant WHERE email ="${email}" AND motDePasse ="${motDePasse}" `,
    (err, result, fields) => {
      //   console.log("error====>", err);

      if (result.length === 0 || undefined) {
        return res.status(404).json({ message: "User not found" });
      }
      console.log("result zéro", result);
      const token = jwtModule.generateAccessToken({
        idParticipant: result[0].idParticipant,
      });
      try {
        res.status(200).json({
          user: result[0],
          token: token,
          message: "User successfully logged in!!",
        });
      } catch (error) {
        res.status(404).json({ error, messsage: "Démerde-toi !" });
      }
    }
  );
});
/** 
 * Créer un utilisateur. Mettre dans le body les 4 champs email, mdp, nom et prenom
 * @param {String} req.body.email Email du user
 * @param {String} req.body.mdp Mot de passe du user
 * @param {String} req.body.nom Nom du user
 * @param {String} req.body.prenom Prénom du user
 * */
router.post("/user", (req, res, next) => {
  // Récupères les infos du user
  let email = req.body.email;
  let password = req.body.mdp;
  let prenom = req.body.prenom;
  let nom = req.body.nom;

  // Requête SQL
  let query =`INSERT INTO participant (email, motDePasse, nom, prenom) VALUES ("${email}", "${password}", "${nom}", "${prenom}")`;
  db.query(query, function (err, result) {
    if (err) throw err;
    res.send({message: "Utilisateur créé", user: result})
  })
});

module.exports = router;
