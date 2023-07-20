import * as productsService from './../services/products.service.js';
import path from 'path';
import fs from "fs";


const getProducts = async (req, res) => {
  const { limit, page, query, sort } = req.query;
  try {
    const products = await productsService.getProducts(limit, page, query, sort);
    return res.send({ status: "success", payload: products });
  } catch (error) {
    req.logger.error(error);
    res
      .status(400)
      .send({
        status: "Error",
        message: "Ha ocurrido un inconveniente en el servidor",
      });
  }
};


const getProduct = async (req, res) => {
  const pid = req.params.pid;
  try {
    const product = await productsService.getProduct(pid);
    product === null
      ? res.status(404).send({
        status: "Error",
        message: "Not found: Producto no encontrado",
      })
      : res.send({ status: "success", payload: product });
  } catch (e) {
    res
      .status(400)
      .send({
        status: "Error",
        message: "Ha ocurrido un inconveniente en el servidor",
      });
  }
};



const saveProduct = async (req, res) => {
  const data = req.body;
  const file = req.file;

  try {
    if (
      data.title === '' ||
      data.description === '' ||
      data.code === '' ||
      data.price === '' ||
      data.stock === '' ||
      data.category === ''
    ) {
      res.send({ status: "error", message: 'Error tratando de crear un producto, datos incompletos' });
    } else {
      const productArr = await productsService.saveProduct(data, file);
      res.send({ status: "success", payload: productArr });
    }
  } catch (error) {
    console.log(error);
  }

};



const updateProduct = (req, res) => {
  const pid = req.params.pid;
  const data = req.body;
  const file = req.file;

  try {

    if (
      data.title === '' ||
      data.description === '' ||
      data.code === '' ||
      data.price === '' ||
      data.stock === '' ||
      data.category === ''
    ) {
      res.send({ status: "error", message: 'Error tratando de crear un producto, datos incompletos' });
    } else {
      
      const respon = productsService.updateProduct(pid, data, file);
      res.send({ message: "success", payload: respon });
    }
  }catch(e){
    console.log(e)
  }
};


const deleteProduct = async (req, res) => {
  const {pid, userSesion} = req.params;

  try {
    if (pid) {

      const respon = await productsService.deleteProduct(pid, userSesion);

      if(respon != null) {
        return res.send({ status: "success", payload: respon });
      }else{
        return res.status(401).send({ status: "Error", message:"Recuerde que solo puede eliminar los productos que usted creo." });
      }
    } else {
      return res.status(400).send({ status: "Error", message:"Error no se envio el id del producto" });
    }
  } catch (error) {
    req.logger.error(error);
    res
      .status(400)
      .send({
        status: "Error",
        message: "Ha ocurrido un inconveniente en el servidor",
      });
  }

};


const getPortada = async function(req, res){
  var img = req.params['img'] || 'default_producto.png';
  fs.stat('./src/public/products/'+img, function(err){
      if(!err){
          let path_img = './src/public/products/'+img;
          res.status(200).sendFile(path.resolve(path_img));
      }else{
          let path_img = './src/public/products/default_producto.png';
          res.status(200).sendFile(path.resolve(path_img));
      }
  });
}

export {
  getProducts,
  getProduct,
  saveProduct,
  updateProduct,
  deleteProduct,
  getPortada
}
