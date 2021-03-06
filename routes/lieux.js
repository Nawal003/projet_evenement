const express = require("express");
const router = express.Router();
const db = require("../services/db");
const jwtModule = require("../middlewares/jwt");


/** Récupérer les lieux */
router.get('/lieux', (req, res) => {
    const query = `SELECT * from lieu`;
    db.query(query, (err, result) => {
        if (err) res.status(403).send(err.sqlMessage);
        if (result) res.send({ message: "Liste des lieux récupérée", lieux: result });
    })
});

/** Récupérer un lieu avec son id */
router.get('/lieu/:id', (req, res) => {
    const query = `SELECT * from lieu WHERE idLieu = '${req.params.id}'`;
    db.query(query, (err, result) => {
        if (err) res.status(404).send({ message: "User not found" });
        if (result) res.send({ message: "Lieu récupéré", lieu: result });
    });
});

/** Ajouter un lieu */
router.post('/lieu', jwtModule.authenticateToken, (req, res) => {
    if(req.body.nom == null || undefined) {res.status(401).send({message : "Nom du lieu manquant"}); return};
    if(req.body.ville == null || undefined) {res.status(401).send({message : "Ville manquante"}); return};
    let nom = req.body.nom;
    let ville = req.body.ville;
    const query = `INSERT INTO lieu (nomLieu, ville) VALUES ("${nom}", "${ville}")`;
    db.query(query, (err, result) => {
        if (err) res.status(403).send(err.sqlMessage);
        if (result) res.send({ message: "Lieu ajouté" });
    })
});

/** Modifier un lieu */
router.put('/lieu/:id', jwtModule.authenticateToken, (req, res) => {
    let nom = req.body.nom;
    let ville = req.body.ville;
    const query = `UPDATE lieu SET nomOrganisateur = "${nom}", ville = "${ville}" WHERE idLieu = '${req.params.id}'`;
    db.query(query, (err, result) => {
        if (err) res.status(403).send(err.sqlMessage);
        if (result) res.send({ message: "Lieu modifié" });
    })
});

/** Supprimer un lieu */
router.delete('/lieu/:id', jwtModule.authenticateToken, (req, res) => {
    const query = `DELETE FROM lieu WHERE idLieu = '${req.params.id}'`;
    db.query(query, (err, result) => {
        if (err) res.status(403).send(err.sqlMessage);
        if (result) res.send({ message: "Lieu supprimé" });
    })
});

module.exports = router;