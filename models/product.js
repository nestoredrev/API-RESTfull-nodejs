`use strict`

const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

//Defnir el modelo producto mediante el Schema de Mongoose
const ProductSchema = Schema({
	name: String,
	picture: String,
	price: {type: Number, default: 0},
	category: {type: String, enum: ['computers','phones','accesories']}, //Definir los valores que puede tomar el campo category
	description: String	
});

//Para que el modelo sea accesible al resto de la aplicacion lo exportamos de la siguiente manera
// y lo importamos donde vemos necesario
module.exports = mongoose.model('Product',ProductSchema);