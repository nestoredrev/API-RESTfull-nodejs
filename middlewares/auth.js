`use strict`

const services = require('../services/index.js');

//Funcion que comprueba si estamos autorizados
//donde enviariamos el token en la cabecera de la peticion
function isAuth(req, res, next)
{
	if(!req.headers.authorization)
	{
		return res.status(403).send({message:`No tienes autorizacion`});
	}
	else
	{
		//Obteninedo solo el token de la cabecera
		const token = req.headers.authorization.split(' ')[1];

		services.decodeToken(token)
		.then(response => {
			req.user = response
			next()
		})
		.catch(response => {
			res.status(`${response.status}`).send({msg:`${response.message}`})
		})
	}
}

module.exports = isAuth;