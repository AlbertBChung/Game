var mongoose = require('mongoose');

var saveStateSchema = new mongoose.Schema({
    username: String,
    id: Number,
    inventory: [{ item: String, itemCount: Number }],
    npc: [{ npcName: String, interactionCount: Number }]
})

module.exports = mongoose.model('SaveState', saveStateSchema );