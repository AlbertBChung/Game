var mongoose = require('mongoose');

var saveStateSchema = new mongoose.Schema({
    id: Number,
    inventory: [{ item: String, itemCount: Number }],
    timePlayed: Number,
    npc: [{ npcName: String, interactionCount: Number }]
})

module.exports = mongoose.model('SaveState', saveStateSchema );