`use strict`
//Instalar jwt para nodejs
//npm i -S jwt-simple

const mongoose = require('mongoose');
const User = require('../models/user.js');
const service = require('../services/index.js');

function signUp(req, res)
{
	
	const user = new User({
		email: req.body.email,
		displayName: req.body.displayName,
		password: req.body.password
	});

	user.save((err) => {

		if(err)
		{
			res.status(500).send({mensaje:`Error al registrarse: ${err}`});
		}
		else
		{
			return res.status(200).send({token: service.createToken(user)});
		}
	});

}

function signIn(req, res)
{

}

module.exports = {
	signUp,
	signIn
} 