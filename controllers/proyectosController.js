const Proyecto = require('../models/Proyecto');

exports.nuevoProyecto = async (req, res, next) => {
    const proyecto = new Proyecto(req.body);

    try {
        await proyecto.save();
        res.json({ mensaje: 'Se agregó un nuevo proyecto' });
    } catch (error) {
        console.log(error);
        res.send(error);
        next();
    }
};

exports.mostrarProyectos = async (req, res, next) => {
    try {
        const proyectos = await Proyecto.find({});
        res.json(proyectos);
    } catch (error) {
        console.log(error);
        res.send(error);
        next();
    }
};

exports.mostrarProyectoPorId = async (req, res, next) => {
    try {
        const proyecto = await Proyecto.findById(req.params.id);
        if (!proyecto) {
            res.json({ mensaje: 'No existe ese proyecto' });
            return next();
        }
        res.json(proyecto);
    } catch (error) {
        console.log(error);
        res.status(400).json({ mensaje: 'ID inválido' });
        next();
    }
};

exports.actualizarProyecto = async (req, res, next) => {
    try {
        const proyecto = await Proyecto.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });
        res.json(proyecto);
    } catch (error) {
        console.log(error);
        res.send(error);
        next();
    }
};

exports.eliminarProyecto = async (req, res, next) => {
    try {
        await Proyecto.findOneAndDelete({ _id: req.params.id });
        res.json({ mensaje: 'Proyecto eliminado' });
    } catch (error) {
        console.log(error);
        res.send(error);
        next();
    }
};
