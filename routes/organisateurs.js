const express = require("express");
const router = express.Router();
const db = require("../services/db");

/** Récupérer les organisateurs */
router.get('/organisateurs', (req, res) => {
    const query = `SELECT * from organisateur`;
    db.query(query, (err, result) => {
        if (err) res.status(403).send(err.sqlMessage);
        if (result) res.send({ message: "Organisateurs récupérés", organisateurs: result });
    })
});

/** Récupérer un organisateur avec son id */
router.get('/organisateur/:id', (req, res) => {
    const query = `SELECT * from organisateur WHERE idOrganisateur = '${req.params.id}'`;
    db.query(query, (err, result) => {
        if (err) res.status(404).send({ message: "User not found" });
        if (result) res.send({ message: "Organisateur récupéré", organisateur: result });
    });
})

/** Ajouter un organisateur */
router.post('/organisateur', (req, res) => {
    let nom = req.body.nom;
    const query = `INSERT INTO organisateur (nomOrganisateur) VALUES ("${nom}")`;
    console.log(query);
    db.query(query, (err, result) => {
        if (err) res.status(403).send(err.sqlMessage);
        if (result) res.send({ message: "Organisateur ajouté" });
    })
});

/** Modifier un organisateur */
router.put('/organisateur/:id', (req, res) => {
    let nom = req.body.nom;
    const query = `UPDATE organisateur SET nomOrganisateur = "${nom}" WHERE idOrganisateur = '${req.params.id}'`;
    db.query(query, (err, result) => {
        if (err) res.status(403).send(err.sqlMessage);
        if (result) res.send({ message: "Organisateur modifié" });
    })
});
module.exports = router;