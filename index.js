//Para empezar un proyecto con node lanzar el comando: npm init
`use strict` // Necesario para poder utilizar ES6 
//ES6 dispone de importacion de modulos con la palabra reservada import
//pero todavia no esta soportado y para eso se necesita utilizar babel
//que es lo mismo de require

//Para no estar parando y arrancando el servidor despues de cada cambio
//en modo desarrollo hay que instalar la dependencia de desarrollo nodemon
//Añadir en pachage.json -> scripts -> "start": "nodemon index.js"
//npm i -D nodemon || npm i --devDependencies nodemon

const mongoose 	= require('mongoose');
const app 		= require('./app.js');
const config 	= require('./config.js');

 mongoose.connect(config.db, (err, res) => {

 	try
 	{
 		if(err)
 		{
 			console.log(res);
 			throw `Ha ocurrido un error al conctarte a la BBDD de mongo ${err}`;
 		}
 		else
 		{
 			//Arrancar servidor nodejs
 			app.listen(config.port, () => {
    			console.log(`API REST corriendo en http://localhost:${config.port}`)
  			})
 		}
 	}
 	catch(e)
 	{
 		console.log(e);
 	}
})