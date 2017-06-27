var mongoose = require('mongoose');

var saveStateSchema = new mongoose.Schema({
    id: Number,
    inventory: [{ item: String }],
    timePlayed: Number,
    npc: [{ npcName: String, interactionCount: Number }]
})