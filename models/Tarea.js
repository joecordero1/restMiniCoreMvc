const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tareasSchema = new Schema({
    descripcion: {
        type: String,
        required: 'Agregar nombre'
    },
    fechaInicio: {
        type: Date,
        required: 'Agregar fecha de inicio'
    },
    tiempEstimado: {
        type: Number,
        required: 'Agregar tiempo estimado'
    },
    estado: {
        type: String,
        enum: ['ToDo', 'InProgress', 'Done'],
        required: true
    },
    Id_Empleado: {
        type: Schema.Types.ObjectId,
        ref: 'Empleado',
        required: true
    },
    Id_Proyecto: {
        type: Schema.Types.ObjectId,
        ref: 'Proyecto',
        required: true
    }
});

module.exports = mongoose.model('Tareas', tareasSchema);