# Proyecto CRUD con Node.js, Express.js y React #
Por: Joe Cordero

Link deployments:
- Backend: [https://rest-mini-core-mvc.vercel.app/](https://rest-mini-core-mvc.vercel.app/) (Servidor para consumir rutas)
- Frontend: [https://elaborate-cheesecake-4b99b9.netlify.app/](https://elaborate-cheesecake-4b99b9.netlify.app/) (Cliente de react)
## Descripción del Proyecto ##
Este proyecto es una aplicación web que implementa el patrón de arquitectura MVC (Modelo-Vista-Controlador) utilizando Node.js y Express.js para el backend y React para el frontend. La aplicación permite la gestión de empleados, proyectos y tareas, así como la generación de reportes de tareas atrasadas dentro de un rango de fechas específico.
## Tecnologías Utilizadas ##
- Backend: Node.js, Express.js, MongoDB
- Frontend: React, Axios
- Otros: Mongoose para la conexión y manejo de la base de datos MongoDB, CORS para la comunicación entre el frontend y el backend, y Nodemon para la actualización automática del servidor durante el desarrollo.
## Instalación y Configuración ##
Prerrequisitos
- Node.js: Asegúrate de tener Node.js instalado en tu máquina. Puedes descargarlo desde [aquí](https://nodejs.org/en/).
- MongoDB: Debes tener MongoDB Community Server instalado y en funcionamiento en tu máquina local. Puedes descargarlo desde [aquí](https://www.mongodb.com/try/download/community). Algunas instrucciones especificas para la instalación de mongo se encuentran en el link del curso de Udemy adjuntado al final.
## Paso a Paso para Configurar el Proyecto ##
### Backend: ###
```bash
git clone https://github.com/joecordero1/clienteReact_MiniCore.git
cd clienteReact_MiniCore
```
#### Instalar las dependencias: ####
```bash
npm install
```
#### Configurar MongoDB: ###
Asegúrate de que MongoDB esté en funcionamiento en mongodb://127.0.0.1:27017/restMiniCore. Puedes modificar esta URL en el archivo index.js si tu configuración es diferente. Esta base de datos se creará por defecto una vez que hayamos corrido el servidor por primera vez, por lo que no es necesario ejecutar ningún script.
#### Iniciar el servidor: ####
```bash
npm start
```
El servidor debería estar corriendo en http://localhost:5000.

### Frontend ###
```bash
git clone https://github.com/joecordero1/restMiniCoreMvc.git
cd restMiniCoreMvc
```
#### Instalar las dependencias: ####
```bash
npm install
```
#### Iniciar la aplicación React: ####
```bash
npm start
```
La aplicación debería estar corriendo en http://localhost:3000.

## Entendiendo el Proyecto ##
### Arquitectura MVC ###
Este proyecto sigue el patrón de diseño MVC, que divide la aplicación en tres componentes principales:
- Modelo (Model): Define la estructura de los datos y las reglas de negocio. En este proyecto, los modelos están definidos usando Mongoose y representan las entidades Empleado, Proyecto y Tarea.
- Vista (View): Representa la interfaz de usuario. En este proyecto, las vistas están implementadas usando React y proporcionan una interfaz interactiva para gestionar empleados, proyectos y tareas.
- Controlador (Controller): Maneja la lógica de la aplicación, responde a las entradas del usuario y realiza interacciones con los modelos. Los controladores en este proyecto están definidos en el backend y manejan las solicitudes HTTP, realizando operaciones CRUD sobre las entidades.

## Estructura del Proyecto ##
#### Configuración del Servidor backend ####
El archivo index.js configura el servidor Express y establece la conexión con MongoDB
```javascript
const express = require('express');
const routes = require('./routes');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

//importar cors para cambiar los recursos entre el react y el server de extress
const cors = require('cors');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://127.0.0.1:27017/restMiniCore') //Aqui debes modificar en caso de que tu puerto sea distinto
    .then(() => console.log("MongoDB Conectado"))
    .catch(err => console.log("MongoDB error de conexión:", err));

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//habilitar cors
app.use(cors());


// Usa las rutas definidas en la carpeta routes.
app.use('/', routes());

// Inicia el servidor en puerto 5000, se puede cambiar al puerto que tu desees.
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Servidro corriendo en puerto ${port}`);
});

```
#### Rutas ####
Las rutas están definidas en routes/index.js y gestionan las operaciones CRUD para empleados, proyectos y tareas, así como la generación de reportes de tareas atrasadas:
```javascript
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
```
#### Modelos ####
Los modelos definen la estructura de los datos
```javascript
//models/Empleado.js
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
```
```javascript
//models/Proyecto.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const proyectosSchema = new Schema({
    nombre: {
        type: String,
        required: 'Agregar nombre'
    }

});

module.exports = mongoose.model('Proyectos', proyectosSchema);
```
```javascript
//models/Tarea.js
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
        ref: 'Empleados',
        required: true
    },
    Id_Proyecto: {
        type: Schema.Types.ObjectId,
        ref: 'Proyectos',
        required: true
    }
});

module.exports = mongoose.model('Tareas', tareasSchema);
```
#### Controladores ####
Los controladores manejan la lógica de negocio, en este caso, manejan el CRUD y tambien los reportes.
Solamente adjunto un solo controlador para Empleados y un controlador para el reporte.
```javascript
//controllers/empleadosController.js
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

```
```javascript
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
```

## Configuración de la aplicación React ##
El frontend está desarrollado en React y utiliza Axios para realizar solicitudes HTTP al backend. La estructura de los componentes de React está organizada de la siguiente manera
#### Configuración de Axios ####
```javascript
import axios from "axios";

const clienteAxios = axios.create({
    baseURL : 'http://localhost:5000'
});

export default clienteAxios;
```
#### Componente App.js ####
El componente principal define las rutas de la aplicación utilizando react-router-dom:
```javascript
import React, {Fragment} from 'react';

//Routing
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

/*** Layout */
import Header from './components/layout/Header'
import Navegacion from './components/layout/Navegacion'
import Empleados from './components/empleados/Empleados';
import NuevoEmpleado from './components/empleados/NuevoEmpleado';
import EditarEmpleado from './components/empleados/EditarEmpledo';
import Proyectos from './components/proyectos/Proyectos';
import NuevoProyecto from './components/proyectos/NuevoProyecto';
import EditarProyecto from './components/proyectos/EditarProyectos';
import Tareas from './components/tareas/Tareas';
import NuevaTarea from './components/tareas/NuevaTarea';
import EditarTarea from './components/tareas/EditarTarea';
import Reportes from './components/reportes/Reporte';


function App () {
  return (
    <Router>
      <Fragment>
        <Header/>

        <div className="grid contenedor contenido-principal">
          <Navegacion/>
          <main className="caja-contenido col-9">
            <Routes>
              <Route path="/" element={<Empleados/>}/>
              <Route path="/empleados/nuevo" element={<NuevoEmpleado/>}/>
              <Route path="/empleados/editar/:_id" element={<EditarEmpleado/>}/>
              <Route path="/proyectos" element={<Proyectos/>}/>
              <Route path="/proyectos/nuevo" element={<NuevoProyecto/>}/>
              <Route path="/proyectos/editar/:_id" element={<EditarProyecto/>}/>
              <Route path="/tareas" element={<Tareas/>}/>
              <Route path="/tareas/nueva" element={<NuevaTarea/>}/>
              <Route path="/tareas/editar/:_id" element={<EditarTarea/>}/>
              <Route path="/reporte" element={<Reportes/>}/>
            </Routes>
          </main>
        </div>
      </Fragment>
    </Router>

    
  )

}


export default App;

```

### Componentes ###
#### Vistas para manejar metodos CRUD de las entidades: ####
Los componentes dentro de la carpeta "components" contienen las vistas necesarias para realizar el CRUD de las entidades Empleado, Proyecto y Tarea. (Revisar código)
#### Vistas para mostrar reporte de tareas: ####
El componente Reporte permite al usuario ingresar un rango de fechas y generar un reporte de tareas atrasadas. (Revisar código)
#### Componente Layout: ####
Este componenete nos sirve para poder manejar el Header (Barra de navegacion) y tambien la columna de navegación entre ventanas.

### Conclusiones ###
Este proyecto de aplicación web demuestra una implementación robusta y eficiente del patrón de arquitectura MVC, combinando Node.js y Express.js en el backend con React en el frontend. Utilizando MongoDB como base de datos, la aplicación permite gestionar eficientemente empleados, proyectos y tareas. Además, incorpora una funcionalidad de generación de reportes para identificar tareas atrasadas dentro de un rango de fechas específico, lo cual es crucial para la gestión y seguimiento de proyectos.

### Información base para el MVC ###
Link de curso en UDEMY. [https://udla.udemy.com/course/nodejs-bootcamp-desarrollo-web-mvc-y-rest-apis/?utm_campaign=share-to-teams-from-product&utm_source=ms-teams](https://udla.udemy.com/course/nodejs-bootcamp-desarrollo-web-mvc-y-rest-apis/?utm_campaign=share-to-teams-from-product&utm_source=ms-teams)

Este curso es esencial para poder comprender este MVC y poder aplicarlo.

Te sugiero revisarlo a partir de la seccion 69 REST API's 

### Información de contacto ###
- joe.cordero@udla.edu.ec (todo teams 🤙🏼)
- joemateo02420@gmail.com
- ig: @veeseman
