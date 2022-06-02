const express = require("express");
const router = express.Router();
const db = require("../services/db");

/** Récupérer tous les utilisateurs */
router.get('/users', (req, res) => {
    const query = `SELECT * from participant`;
    db.query(query, (err, result) => {
        if (err) res.status(403).send(err.sqlMessage);
        if (result) res.send({ message: "Liste des participants récupérée", users: result });
    })
});

/** Récupérer un user avec son id */
router.get('/user/:id', (req, res) => {
    const query = `SELECT * from participant WHERE idParticipant = '${req.params.id}'`;
    db.query(query, (err, result) => {
        if (err) res.status(404).send({ message: "User not found" });
        if (result) res.send({ message: "User récupéré", lieu: result });
    });
});

/** 
 * Créer un utilisateur. Mettre dans le body les 4 champs email, mdp, nom et prenom
 */
 router.post("/user", (req, res, next) => {
    // Récupères les infos du user
    let email = req.body.email;
    let password = req.body.mdp;
    let prenom = req.body.prenom;
    let nom = req.body.nom;
  
    // Requête SQL
    const query =`INSERT INTO participant (email, motDePasse, nom, prenom) VALUES ("${email}", "${password}", "${nom}", "${prenom}")`;
    db.query(query, (err, result) => {
      if (err) throw err;
      if (result) res.send({message: "Utilisateur créé"});
    })
  });

/** Modifier un user */
router.put('/user/:id', (req, res) => {
    let email = req.body.email;
    let password = req.body.mdp;
    let prenom = req.body.prenom;
    let nom = req.body.nom;
    const query = `UPDATE participant SET nom = "${nom}", prenom = "${prenom}", email = "${email}", motDePasse = "${password}" WHERE idParticipant = '${req.params.id}'`;
    db.query(query, (err, result) => {
        if (err) res.status(403).send(err.sqlMessage);
        if (result) res.send({ message: "User modifié" });
    })
});
module.exports = router;