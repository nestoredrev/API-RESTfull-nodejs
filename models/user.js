`use strict`

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//Libreria para cifrar/encriptar
//instalar la libreria: npm i -S bcrypt-nodejs
const bcrypt = require('bcrypt-nodejs');
//instalar la libreria: npm i -S crypto
const crypto = require('crypto');

const UserSchema = new Schema({
	email: { type: String, unique: true, lowercase: true }, // forzar el guaradado en minuscula
	displayName: String,
	avatar: String,
	password: { type: String, select: false }, // select:false no devolver ese campo cuando solicitamos los datos de algun usuario
	signUpDate: {type: Date, default: Date.now()},
	lastLogin: Date
});

//Mongoose dispone de funcionalidades que se pueden ejecutar antes o despues
//a la hora de realizar caulquier operaciones/actuaciones sobre la BBDD similar a otro motores
//de base de datos como BEFORE INSERT/UPDATE/DELETE o AFTER INSERT/UPDATE/DELETE

//Antes de insertar el usuario en la BBDD vamos a encriptar su contraseña
//next es para pasar a la sugiente middleware para que no se pare ahi la funcion
UserSchema.pre('save', function(next) {

	if(!this.isModified('password')) // si no se esta modificando la contraseña next
	{
		return next();
	}
	else
	{
		bcrypt.genSalt(10, (err, salt) => {
			if(err)
			{
				//En caso de error al generar el salt
				return next();
			}
			else
			{
				bcrypt.hash(this.password, salt, null , (err, hash) => {
					if(err)
					{
						//Error al generar el hash del password
						return next();
					}
					else
					{
						this.password = hash;
						next();
					}
				});
			}
		});
	}
})

//Metodo para verificar la contraseña. cb es la funcion que nos devuelve si hay error o si la contraseña
//es valida o no en parametro isMatch
UserSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};


//Gravatar a partir de un email sacar su foto de perfil
UserSchema.methods.gravatar = function (){
	if(!this.email)
	{
		return `https://gravatar.com/avatar/?s200&d=retro`; // si no tiene mail devuelve un avatar por defecto
	} 
	else
	{
		//hash en md5 necesario para el gravatar para cifrar la url de avatar que tiene por defecto
		const md5 = crypto.createHash('md5').update(this.email).digest('hex');
	
		return `https://gravatar.com/avatar/${md5}/?s200&d=retro`;
	}
}

module.exports = mongoose.model('User', UserSchema);