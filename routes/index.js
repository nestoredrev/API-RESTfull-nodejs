//Añadir las rutas de la API
`use strict`
const express 		= require('express');
const productCtrl 	= require('../controlers/product.js');
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

module.exports = api;