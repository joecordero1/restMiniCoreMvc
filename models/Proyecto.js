const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const proyectosSchema = new Schema({
    nombre: {
        type: String,
        required: 'Agregar nombre'
    }

});

module.exports = mongoose.model('Proyectos', proyectosSchema);