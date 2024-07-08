const express = require('express');
const router = express.Router();
const empleadoController = require('../controllers/empleadosController');
const proyectoController = require('../controllers/proyectosController');
const tareaController = require('../controllers/tareasController');
const reportesController = require('../controllers/reportesController');


// Aquí defines las rutas de tu API.
module.exports = function() {
    // Rutas para empleados
    router.post('/empleados', empleadoController.nuevoEmpleado);
    router.get('/empleados', empleadoController.mostrarEmpleados);
    router.get('/empleados/:id', empleadoController.mostrarEmpleadoPorId);
    router.put('/empleados/:id', empleadoController.actualizarEmpleado);
    router.delete('/empleados/:id', empleadoController.eliminarEmpleado);

    // Rutas para proyectos
    router.post('/proyectos', proyectoController.nuevoProyecto);
    router.get('/proyectos', proyectoController.mostrarProyectos);
    router.get('/proyectos/:id', proyectoController.mostrarProyectoPorId);
    router.put('/proyectos/:id', proyectoController.actualizarProyecto);
    router.delete('/proyectos/:id', proyectoController.eliminarProyecto);

    // Rutas para tareas
    router.post('/tareas', tareaController.nuevaTarea);
    router.get('/tareas', tareaController.mostrarTareas);
    router.get('/tareas/:id', tareaController.mostrarTareaPorId);
    router.put('/tareas/:id', tareaController.actualizarTarea);
    router.delete('/tareas/:id', tareaController.eliminarTarea);

    // Ruta para reporte de tareas atrasadas
    router.get('/reporte/tareas-atrasadas/:fechaInicio/:fechaFin', reportesController.reporteTareasAtrasadas);


    return router;
}
