`use strict`

//Instalar jwt para nodejs
//npm i -S jwt-simple
const jwt = require('jwt-simple');
//Instalar momentjs
//npm i -S moment
const moment = require('moment');
const config = require('../config.js');
const fs 	 = require('fs'); //Libreria File System propia de Nodejs

function createToken(user)
{
	//Los datos que se van a enviar al servidor y segun ellos sera que es lo que tiene que hacer
	const payload = {
		// sub es el id de identificacion de usuario, es decir que usuario es
		// lo correcto es uno utilizar el id que se esta almacenando en la bbdd ya que
		// puede poner en peligro la integridad de la bbdd
		sub: user._id,
		iat: moment().unix(), // Cuando fue creado el token
		exp: moment().add(14,'days').unix() // cuando va a expirar el token, es decir en 14 dias
	}

	//Devolver el token codificado
	return jwt.encode(payload, config.SECRET_TOKEN);
}

function decodeToken(token)
{
	//Promesa nativa de ECMA SCRIPT6
	const decoded = new Promise((resolve, reject) =>{
		try
		{
			const payload = jwt.decode(token, config.SECRET_TOKEN);
			if(payload.exp <= moment().unix())
			{
				reject({
					status: 401,
					message: `El token ha expirado`
				});
			}
			else
			{
				resolve(payload.sub)
			}
		}
		catch(err)
		{
			reject({
				status: 500,
				message: `Token invalido: ${err}`
			})
		}
	});

	//Devolver la promesa
	return decoded;
}

function createLog(logData)
{
	//__dirname devuelve la ruta del directorio sobre el fichero que se esta trabajando
	filePath = __dirname + '/logs/logSignIn.txt';
	var logFile = fs.createWriteStream(filePath, { flags: 'a' });
	logFile.write(logData + '\n');
}

module.exports = {
	createToken,
	decodeToken,
	createLog
}