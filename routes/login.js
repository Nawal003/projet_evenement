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

module.exports = router;
