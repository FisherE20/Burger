const express = require("express");
const router = express.Router();

// Import the model (burger.js) to use its database functions.
const burger = require("../models/burger");

// Create all our routes and set up logic within those routes where required.
router.get("/", function(req,res) {
    burger.all(function(data) {
        lethbsObject = {
            burgers:data
        };
        console.log(hbsObject);
        res.render("index",hbsObject);
    });
})