const express = require("express");
const router = express.Router();
const db = require("../services/db");
const jwtModule = require("../middlewares/jwt");

/** Récupérer tous les utilisateurs */
router.get('/users', (req, res) => {
    const query = `SELECT nom, prenom, email from participant`;
    db.query(query, (err, result) => {
        if (err) res.status(403).send(err.sqlMessage);
        if (result) res.send({ message: "Liste des participants récupérée", users: result });
    })
});

/** Récupérer un user avec son id */
router.get('/user/:id', jwtModule.authenticateToken, (req, res) => {
    const query = `SELECT nom, prenom, email from participant WHERE idParticipant = '${req.params.id}'`;
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
    const query = `INSERT INTO participant (email, motDePasse, nom, prenom) VALUES ("${email}", "${password}", "${nom}", "${prenom}")`;
    db.query(query, (err, result) => {
        if (err) res.status(403).send(err.sqlMessage);
        if (result) res.send({ message: "Utilisateur créé" });
    })
});

/** Modifier un user */
router.put('/user/:id', jwtModule.authenticateToken, (req, res) => {
    if (req.body.email == null || undefined) { res.status(401).send({ message: "Email manquant" }); return };
    if (req.body.mdp == null || undefined) { res.status(401).send({ message: "Password manquant" }); return };
    if (req.body.nom == null || undefined) { res.status(401).send({ message: "Nom manquant" }); return };
    if (req.body.prenom == null || undefined) { res.status(401).send({ message: "Prénom manquant" }); return };
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

/** Supprimer un user */
router.delete('/user/:id', jwtModule.authenticateToken, (req, res) => {
    const query = `DELETE FROM participant WHERE idParticipant = '${req.params.id}'`;
    db.query(query, (err, result) => {
        if (err) res.status(403).send(err.sqlMessage);
        if (result) res.send({ message: "User supprimé" });
    })
});

module.exports = router;