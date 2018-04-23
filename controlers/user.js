`use strict`

const mongoose = require('mongoose');
const User = require('../models/user.js');
const service = require('../services/index.js');

function signUp(req, res)
{
	
	const user = new User({
		email: 			req.body.email,
		displayName: 	req.body.displayName,
		password: 		req.body.password
	});

	user.avatar = user.gravatar();

	user.save((err) => {

		if(err)
		{
			res.status(500).send({mensaje:`Error al registrarse: ${err}`});
		}
		else
		{
			return res.status(200).send({mensaje:`Te has registrado correctamente`,token: service.createToken(user)});
		}
	});

}

function signIn(req, res)
{
	User.findOne({email: req.body.email}, function(err, user) {

		if(err)
		{
			return res.status(500).send({mensaje:`Ha ocurrido un error del servidor: ${err}`});
		}
		if(!user)
		{
			return res.status(404).send({mensaje: `El usuario no existe ${user}`});
		}
		req.user = user;
		return res.status(200).send({
			message: `Te has logueado correctamente`,
			token: service.createToken(user)
		});
	})
}

module.exports = {
	signUp,
	signIn
} 