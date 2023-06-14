import CustomError from "../services/errors/CustomError.js";
import Products from "../dao/dbManager/products.js";
import ProductsRepository from "../repository/products.repository.js";
import EErrors from "../services/errors/enums.js";
import { productErrorInfo } from '../services/errors/info.js';
import config from "../config/config.js";


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
        portada: file?.filename || '',
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

  if (
    data.title === '' ||
    data.description === '' ||
    data.code === '' ||
    data.price === '' ||
    data.stock === '' ||
    data.category === '' ||
    data.status === ''
  ) {
    throw CustomError.createError({
      name: 'UserError',
      cause: productErrorInfo({
        title: data.title,
        description: data.description,
        code: data.code,
        price: data.price,
        stock: data.stock,
        category: data.category,
      }),
      message: 'Error tratando de editar un usuario',
      code: EErrors.INVALID_TYPES_ERROR
    });
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
    const respon = productsRepository.updateProduct(pid, product);
    res.send({ message: "success", payload: respon });
  }
};


const deleteProduct = async (req, res) => {
  const {pid, userSesion} = req.params;

  try {
    if (pid) {
      if(userSesion == config.adminEmail){
        const respon = await productsRepository.deleteProduct(pid);
        return res.send({ message: "success", payload: respon });
      }else{
        const product = await productsRepository.getProduct(pid);
        if(product.owner == userSesion){
          const respon = await productsRepository.deleteProduct(pid);
          return res.send({ message: "success", payload: respon });
        }else{
          return res.status(401).send({ status: "Error", message:"Recuerde que solo puede eliminar los productos que usted creo." });
        }
      }
    } else {
      console.log('Entraaaaaaaaaaaaaaaaa')
      return res.status(400).send({ status: "Error", message:"Recuerde que solo puede eliminar los productos que usted creo." });
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

export {
  getProducts,
  getProduct,
  saveProduct,
  updateProduct,
  deleteProduct
}
