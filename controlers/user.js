`use strict`

const mongoose 	= require('mongoose');
const moment 	= require('moment');
const User 		= require('../models/user.js');
const service 	= require('../services/index.js');

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
	//user es el usuario encontrado
	User.findOne({email: req.body.email}, function(err, user) {
		if(err)
		{
			return res.status(500).send({mensaje:`Ha ocurrido un error del servidor: ${err}`});
		}

		if(!user)
		{
			return res.status(404).send({mensaje: `El usuario no existe ${user}`});
		}
		else
		{
			user.comparePassword(req.body.password, (err, isMatch) => {
		      if (err) return res.status(500).send({ msg: `Error al ingresar: ${err}` })
		      if (!isMatch) return res.status(404).send({ msg: `Error de contraseña: ${req.body.email}` })

				//req.user = user;
				let email = user.email;
				let ip = req.ip;
				let browser = req.headers['user-agent'];
				let date = moment().format('DD/MM/YYYY H:mm:ss');
				let logData = `[Login date: ${date}] --- [IP Address: ${ip}] --- [User: ${email} ] --- [Browser: ${browser}] `;
				
				service.createLog(logData);

				return res.status(200).send({
					message: `Te has logueado correctamente`,
					token: service.createToken(user)
				});
		    });
		}

	}).select('_id email password'); // datos a seleccionar con  del resultado findOne
}

module.exports = {
	signUp,
	signIn
} 