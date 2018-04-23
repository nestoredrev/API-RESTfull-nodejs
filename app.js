//Añadir toda la funcionalidad de express
`use strict`

//Para instalar express npm install express --save || Para instalar express npm i express -S
// Framework de nodejs que facilite la comunicacion cliente servidor
const express = require('express');

//Para instalar de forma global express npm install body-parser --save
//Libreria necesaria para captar las peticiones POST GET etc y aceder/parsear su cuerpo con node
const bodyParser = require('body-parser');

//Para instalar: npm i -S express-handlebars
//Es una libreria para express donde desde el servidor nodejs 
//se pueden renderizar paginas dinamicas de html al cliente
const hbs = require('express-handlebars');

const api = require('./routes/index.js');

const app = express();



//Middleware:  es un bloque de codigo que se ejecuta entre la peticiones que hace el usuario
//(cliente REQUEST) hasta que la peticion llega al servidor
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())// Definier el cuerpo del mensaje con el formato JSON



//Configuracion del motor de plantillas de Handlebars para express
/*Reconfigurar la extension de los ficheros handlebars ya que por defecto vienen
con la extension .handlebars.*/
app.engine('.hbs', hbs({
	defaultLayout: 'default', // Plantilla por defecto o plantilla padre
	extname: 'hbs' // Definir extension por defecto
}))

app.set('view engine', '.hbs');
app.use('/api', api); // ruta raiz /api
app.get('/login', (req, res) => {
	res.render('login') // Que vista rederizar a nivel de la carpeta Views
});


//Pasar por paramento mediante el metodo GET: pj : http://localhost:3000/hola/nestor
app.get('/hola/:name/:apellido',(request,response) => {
	response.send({mensaje:`Hola ${request.params.name} ${request.params.apellido}`});
	response.end(); // La respuesta no devuelve nada y acaba
});

module.exports = app;