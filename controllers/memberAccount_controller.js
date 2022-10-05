const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const router = express.Router();
const Account = require("../models/memberAccount");

router.get("/", async (req, res) => {
    //only returns the name and location feilds of mongoose object
    await Account.find({ accountType: "provider" })
        .select("name location")
        .lean()
        .then((foundAccount) => {
            res.json(foundAccount);

            res.status(200);
        })
        .catch((error) => {
            console.log(error);
            res.status(404);
        });
});

//gets and account by id
router.get("/:id", (req, res) => {
    const id = req.params.id;
    try {
        Account.findById(id).then((foundAccount) => {
            res.json(foundAccount);
        });
    } catch (error) {
        res.status(500).send(error);
        console.log(error);
    }
});

//makes new account
router.post("/", (req, res) => {
    Account.create(req.body)
        .then((createdAccount) => {
            console.log(createdAccount);
            res.status(200);
        })
        .catch((error) => {
            res.status(404).send(404);
            console.log(error);
        });

    console.log("created account");
});

//edits account
router.put("/:id", (req, res) => {
    try {
        Account.findByIdAndUpdate(req.params.id, req.body).then(
            (updatedAccount) => {
                res.json(updatedAccount);
            }
        );
    } catch (error) {
        res.status(500).send(error);
        console.log(error);
    }
});

//deletes account
router.delete("/:id", (req, res) => {
    try {
        Account.findByIdAndDelete(req.params.id).then((deletedAccount) => {
            res.json(deletedAccount);
        });
    } catch (error) {
        res.status(500).json({ message: "delete error" });
        console.log(error);
    }
});

module.exports = router;