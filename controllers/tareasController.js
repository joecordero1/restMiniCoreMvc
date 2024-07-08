const Tarea = require('../models/Tarea');

exports.nuevaTarea = async (req, res, next) => {
    const tarea = new Tarea(req.body);

    try {
        await tarea.save();
        res.json({ mensaje: 'Se agregó una nueva tarea' });
    } catch (error) {
        console.log(error);
        res.send(error);
        next();
    }
};

exports.mostrarTareas = async (req, res, next) => {
    try {
        const tareas = await Tarea.find({})
            .populate('Id_Empleado', 'nombre apellido')
            .populate('Id_Proyecto', 'nombre');
        res.json(tareas);
    } catch (error) {
        console.log(error);
        res.send(error);
        next();
    }
};

exports.mostrarTareaPorId = async (req, res, next) => {
    try {
        const tarea = await Tarea.findById(req.params.id)
            .populate('Id_Empleado', 'nombre apellido')
            .populate('Id_Proyecto', 'nombre');
        if (!tarea) {
            res.json({ mensaje: 'No existe esa tarea' });
            return next();
        }
        res.json(tarea);
    } catch (error) {
        console.log(error);
        res.status(400).json({ mensaje: 'ID inválido' });
        next();
    }
};

exports.actualizarTarea = async (req, res, next) => {
    try {
        const tarea = await Tarea.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
            .populate('Id_Empleado', 'nombre apellido')
            .populate('Id_Proyecto', 'nombre');
        res.json(tarea);
    } catch (error) {
        console.log(error);
        res.send(error);
        next();
    }
};

exports.eliminarTarea = async (req, res, next) => {
    try {
        await Tarea.findOneAndDelete({ _id: req.params.id });
        res.json({ mensaje: 'Tarea eliminada' });
    } catch (error) {
        console.log(error);
        res.send(error);
        next();
    }
};
