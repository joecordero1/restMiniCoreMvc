const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const empleadosSchema = new Schema({
    nombre: {
        type: String,
        required: 'Agrega tu nombre'
    },
    apellido: {
        type: String,
        required: 'Agrega tu apellido'
    }

});

module.exports = mongoose.model('Empleados', empleadosSchema);