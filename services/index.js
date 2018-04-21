`use strict`

const jwt = require('jwt-simple');
//Instalar momentjs
//npm i -S moment
const moment = require('moment');
const config = require('../config.js');

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

module.exports = createToken