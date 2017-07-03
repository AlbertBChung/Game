var express = require('express')
var router = express.Router()
var saveState = require('../models/saveState');

// handles POST request 
exports.postSaveStates = function(req, res) {
    var save = new saveState();

    save.username = req.body.username;
    save.id = req.body.id;
    save.inventory = req.body.inventory;
    save.npcInteractions = req.body.npcInteractions;

    save.save(function(err) {
        if (err)
            res.send(err);

        res.json({ message : username + ' saved the game!'});
    });
};

// handles GET request for multiple save states
exports.getSaveStates = function(req, res) {
    saveState.find(function(err, saveStates) {
        if (err)
            res.send(err);

        res.json(saveStates);
    });
};

// handles GET request for a single save state
exports.getSaveState = function(req, res) {
    saveState.findById(req.params.username, function(err, saveState) {
        if (err)
            res.send(err);

        res.json(saveState);
    });
};

// handles PUT request
exports.putSaveState = function(req, res) {
    saveState.findById(req.params.username, function(err, saveState) {
        if (err)
            res.send(err);

        // updates the corresponding save state's chapter ID, inv, and interactions
        saveState.id = req.body.id;
        saveState.inventory = req.body.inventory;
        saveState.npcInteractions = req.body.npcInteractions;

        saveState.save(function(err) {
            if (err)
                res.send(err);

            res.json(saveState);
        });
    });
};
