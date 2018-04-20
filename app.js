//Añadir toda la funcionalidad de express
`use strict`

//Para instalar express npm install express --save || Para instalar express npm i express -S
// Framework de nodejs que facilite la comunicacion cliente servidor
const express = require('express');

//Para instalar de forma global express npm install body-parser --save
//Libreria necesaria para captar las peticiones POST GET etc y aceder/parsear su cuerpo con node
const bodyParser = require('body-parser');

const api = require('./routes/index.js');

const app = express();



//Middleware:  es un bloque de codigo que se ejecuta entre la peticiones que hace el usuario
//(cliente REQUEST) hasta que la peticion llega al servidor
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())// Definier el cuerpo del mensaje con el formato JSON
app.use('/api', api); // ruta raiz /api


//Pasar por paramento mediante el metodo GET: pj : http://localhost:3000/hola/nestor
app.get('/hola/:name/:apellido',(request,response) => {
	response.send({mensaje:`Hola ${request.params.name} ${request.params.apellido}`});
	response.end(); // La respuesta no devuelve nada y acaba
});

module.exports = app;