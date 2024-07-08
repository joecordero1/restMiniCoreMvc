const Empleado = require('../models/Empleado');

exports.nuevoEmpleado = async (req, res, next) => {
    const empleado = new Empleado(req.body);

    try {
        await empleado.save();
        res.json({ mensaje: 'Se agregó un nuevo empleado' });
    } catch (error) {
        console.log(error);
        res.send(error);
        next();
    }
};

exports.mostrarEmpleados = async (req, res, next) => {
    try {
        const empleados = await Empleado.find({});
        res.json(empleados);
    } catch (error) {
        console.log(error);
        res.send(error);
        next();
    }
};

exports.mostrarEmpleadoPorId = async (req, res, next) => {
    try {
        const empleado = await Empleado.findById(req.params.id);
        if (!empleado) {
            res.json({ mensaje: 'No existe ese empleado' });
            return next();
        }
        res.json(empleado);
    } catch (error) {
        console.log(error);
        res.status(400).json({ mensaje: 'ID inválido' });
        next();
    }
};

exports.actualizarEmpleado = async (req, res, next) => {
    try {
        const empleado = await Empleado.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });
        res.json(empleado);
    } catch (error) {
        console.log(error);
        res.send(error);
        next();
    }
};

exports.eliminarEmpleado = async (req, res, next) => {
    try {
        await Empleado.findOneAndDelete({ _id: req.params.id });
        res.json({ mensaje: 'Empleado eliminado' });
    } catch (error) {
        console.log(error);
        res.send(error);
        next();
    }
};
