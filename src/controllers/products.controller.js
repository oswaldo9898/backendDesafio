import CustomError from "../services/errors/CustomError.js";
import Products from "../dao/dbManager/products.js";
import ProductsRepository from "../repository/products.repository.js";
import EErrors from "../services/errors/enums.js";
import { productErrorInfo } from '../services/errors/info.js';
import config from "../config/config.js";
import { sendEmailDeletAccount, sendEmailDeletProduct } from '../utils/sendEmail/index.js';

import fs from "fs";
import path from 'path';


const productsManager = new Products();
const productsRepository = new ProductsRepository(productsManager);

const getProducts = async (req, res) => {
  const { limit, page, query, sort } = req.query;
  try {
    const products = await productsRepository.getProducts(limit, page, query, sort);
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
    const product = await productsRepository.getProduct(pid);
    product === null
      ? res.status(404).send({
        status: "Error",
        message: "Not found: Producto no encontrado",
      })
      : res.send({ status: "success", payload: product });
  } catch (e) {
    //req.logger.error(error);
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
      // throw CustomError.createError({
      //   name: 'UserError',
      //   cause: productErrorInfo({
      //     title: data.title,
      //     description: data.description,
      //     code: data.code,
      //     price: data.price,
      //     stock: data.stock,
      //     category: data.category,
      //   }),
      //   message: 'Error tratando de crear un producto',
      //   code: EErrors.INVALID_TYPES_ERROR
      // });
    } else {
      const product = {
        title: data.title,
        description: data.description,
        code: data.code,
        price: data.price,
        status: true,
        stock: data.stock,
        category: data.category,
        portada: file?.filename || 'sinfoto',
        owner: data?.owner || '',
        thumbnail: [],
      };
      const productArr = await productsRepository.saveProduct(product);
      res.send({ message: "success", payload: productArr });
    }
  } catch (error) {
    console.log(error);
  }

};


const updateProduct = (req, res) => {
  const pid = req.params.pid;
  const data = req.body;
  const file = req.file;

  console.log('entraaaa asqi');

  try {

    if (
      data.title === '' ||
      data.description === '' ||
      data.code === '' ||
      data.price === '' ||
      data.stock === '' ||
      data.category === ''
    ) {
      console.log('no pasa')
      // throw CustomError.createError({
      //   name: 'UserError',
      //   cause: productErrorInfo({
      //     title: data.title,
      //     description: data.description,
      //     code: data.code,
      //     price: data.price,
      //     stock: data.stock,
      //     category: data.category,
      //   }),
      //   message: 'Error tratando de editar un usuario',
      //   code: EErrors.INVALID_TYPES_ERROR
      // });
    } else {
      const product = {
        title: data.title,
        description: data.description,
        code: data.code,
        price: data.price,
        status: data.status,
        stock: data.stock,
        category: data.category,
        thumbnail: [],
      };

      if(file?.filename){
        product.portada = file.filename;
      }

      console.log(product)

      const respon = productsRepository.updateProduct(pid, product);
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
      const product = await productsRepository.getProduct(pid);

      if(userSesion == config.adminEmail){

        if(product.owner !== userSesion){
          sendEmailDeletProduct(product.owner, product.title);
        }
        const respon = await productsRepository.deleteProduct(pid);
        return res.send({ message: "success", payload: respon });

      }else{

        if(product.owner == userSesion){
          sendEmailDeletProduct(product.owner, product.title);
          const respon = await productsRepository.deleteProduct(pid);
          return res.send({ message: "success", payload: respon });

        }else{
          return res.status(401).send({ status: "Error", message:"Recuerde que solo puede eliminar los productos que usted creo." });
        }
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
