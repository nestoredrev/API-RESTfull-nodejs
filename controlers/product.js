`use strict`

//Importar el Schema del Producto
//Como no es un paquete de npm hay que indicar la ruta
const Product = require('../models/product.js');

function getProduct(req, res)
{
	let productId = req.params.productId;
	Product.findById(productId, (err,product) => {
		if(err)
		{
			return res.status(500).send({mensaje:`Error al realizar la peticion: ${err}`});
		}
		if (!product)
		{
			return res.status(404).send({mensaje:`El producto ${productId} no existe`});
		}
		else
		{
			res.status(200).send({product:product});
		}
	});
}

function getProducts(req, res)
{
	//En find si no le pasas nada significa que busque todos los productos
	Product.find({}, (err,products) => {
		if(err)
		{
			return res.status(500).send({mensaje:`Error al realizar la peticion: ${err}`});
		}
		if(!products)
		{
			return res.status(404).send({mensaje:`No existen productos`});
		}
		else
		{
			res.status(200).send({products:products});
		}
	});
}

function saveProduct(req, res)
{
	let product = new Product();
	product.name 		= req.body.name;
	product.price 		= req.body.price;
	product.picture		= req.body.photo;
	product.category 	= req.body.category;
	product.description = req.body.description;
	console.log(product);
	//res.send(200, {mensaje: 'El producto se ha recibido correctamente'}); //Deprecated
	
	//res.status(404).send({mensaje: 'El producto se ha recibido correctamente'});

	product.save((err,productStored) => {
		if(err)
		{
			res.status(500).send({mensaje:`Error al salvar el producto en BBDD: ${err}`});
		}
		else
		{
			res.status(200).send({product:productStored});
		}
	});
}

function updateProduct(req, res)
{
	let productId = req.params.productId;
	let update = req.body;
	//new:true devuelve el producto modificado a partir de la version 4.0 de mongo es necesario
	Product.findByIdAndUpdate(productId, update, {new:true}, (err, productUpdated) => {
		if(err)
		{
			return res.status(500).send({mensaje:`Error al modificar el producto: ${err}`});
		}
		else
		{
			res.status(200).send({productActualizado:productUpdated});
		}
	});
}

function deleteProduct(req, res)
{
	let productId = req.params.productId;
	Product.findById(productId, (err,product) => {
		if(err)
		{
			return res.status(500).send({mensaje:`Error al borrar el producto: ${err}`});
		}
		else
		{
			product.remove(err => {
				if(err)
				{
					return res.status(500).send({mensaje:`Error al borrar el producto: ${err}`});			
				}
				else
				{
					res.status(200).send({mensaje:`El producto ${productId} fue borrado correctamente`});
				}
			})
		}
	});
}

module.exports = {
	getProduct,
	getProducts,
	saveProduct,
	updateProduct,
	deleteProduct
}