const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const KudoSchema = new Schema({
    fuente: Number,
    destino: Number,
    tema: String,
    fecha: Date,
    lugar: String,
    texto: String
});
module.exports = mongoose.model('Kudos',KudoSchema);