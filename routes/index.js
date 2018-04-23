//Añadir las rutas de la API
`use strict`
const express 		= require('express');
const productCtrl 	= require('../controlers/product.js');
const userCtrl		= require('../controlers/user.js');
const auth 			= require('../middlewares/auth.js'); 	
const api 			= express.Router();



//Mostrar todos los producos
api.get('/product',productCtrl.getProducts);

//Obtener un producto mediante GET
api.get('/product/:productId', productCtrl.getProduct);

//Insertar un producto mediante el metodo POST
api.post('/product', productCtrl.saveProduct);

//Actualizar el producto mediante el metodo PUT
api.put('/product/:productId', productCtrl.updateProduct);

//Eliminar el producto mediante el metodo DELETE
api.delete('/product/:productId', productCtrl.deleteProduct);


api.post('/signup', userCtrl.signUp);
api.post('/signin', userCtrl.signIn);

//Area privada
api.get('/private', auth, (req, res) => {
	res.status(200).send({message: `Tienes acceso`})
})

module.exports = api;