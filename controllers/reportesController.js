const Tarea = require('../models/Tarea');
const Empleado = require('../models/Empleado');
const Proyecto = require('../models/Proyecto');

// Función para calcular tareas atrasadas dentro de un rango de fechas
async function calcularTareasAtrasadas(fechaInicio, fechaFin) {
    try {
        console.log(`Calculando tareas atrasadas desde ${fechaInicio} hasta ${fechaFin}`);

        // Buscar todas las tareas en estado InProgress
        const tareas = await Tarea.find({
            estado: 'InProgress'
        }).populate('Id_Empleado', 'nombre apellido').populate('Id_Proyecto', 'nombre');

        console.log(`Tareas encontradas: ${tareas.length}`);
        tareas.forEach(tarea => {
            console.log(`Tarea: ${tarea.descripcion}, Fecha Inicio: ${tarea.fechaInicio}`);
        });

        const tareasAtrasadas = tareas.filter(tarea => {
            const fechaEstimadaFinalizacion = new Date(tarea.fechaInicio);
            fechaEstimadaFinalizacion.setDate(fechaEstimadaFinalizacion.getDate() + tarea.tiempEstimado);
            const estaAtrasada = fechaEstimadaFinalizacion < new Date(fechaFin);
            const dentroDeRango = new Date(tarea.fechaInicio) <= new Date(fechaFin) && new Date(tarea.fechaInicio) >= new Date(fechaInicio);
            console.log(`Tarea: ${tarea.descripcion}, Fecha Estimada Finalización: ${fechaEstimadaFinalizacion}, Está Atrasada: ${estaAtrasada}`);
            return estaAtrasada && dentroDeRango;
        }).map(tarea => {
            const fechaEstimadaFinalizacion = new Date(tarea.fechaInicio);
            fechaEstimadaFinalizacion.setDate(fechaEstimadaFinalizacion.getDate() + tarea.tiempEstimado);
            const diasAtrasados = Math.floor((new Date(fechaFin) - fechaEstimadaFinalizacion) / (1000 * 60 * 60 * 24));
            return {
                ...tarea.toObject(),
                fechaEstimadaFinalizacion,
                diasAtrasados
            };
        });

        console.log(`Tareas atrasadas encontradas: ${tareasAtrasadas.length}`);

        return { totalAtrasadas: tareasAtrasadas.length, tareasAtrasadas };
    } catch (error) {
        console.error('Error calculando tareas atrasadas:', error);
        throw error;
    }
}

// Controlador para manejar la solicitud del reporte con fechas como parámetros de ruta
exports.reporteTareasAtrasadas = async (req, res, next) => {
    const { fechaInicio, fechaFin } = req.params;

    try {
        const reporte = await calcularTareasAtrasadas(new Date(fechaInicio), new Date(fechaFin));
        res.json(reporte);
    } catch (error) {
        console.error('Error generando el reporte de tareas atrasadas:', error);
        res.status(500).json({ mensaje: 'Hubo un error al generar el reporte' });
        next();
    }
};