import CustomError from "../services/errors/CustomError.js";
import Products from "../dao/dbManager/products.js";
import ProductsRepository from "../repository/products.repository.js";
import EErrors from "../services/errors/enums.js";
import { productErrorInfo } from '../services/errors/info.js';


const productsManager = new Products();
const productsRepository = new ProductsRepository(productsManager);

const getProducts = async (req, res) => {
  const { limit, page, query, sort } = req.query;
  try {
    const products = await productsRepository.getProducts(limit, page, query, sort);
    return res.send({ status: "success", payload: products });
  } catch (error) {
    console.log(error)
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
    product.length === 0
      ? res.send({
          status: "Error",
          message: "Not found: Producto no encontrado",
        })
      : res.send({ message: "success", payload: product });
  } catch (e) {
    res
      .status(400)
      .send({
        status: "Error",
        message: "Ha ocurrido un inconveniente en el servidor",
      });
  }
};


const saveProduct = (req, res) => {
  const data = req.body;

    if (
      data.title === '' ||
      data.description === '' ||
      data.code === '' ||
      data.price === '' ||
      data.stock === '' ||
      data.category === ''
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
        message: 'Error tratando de crear un product',
        code: EErrors.INVALID_TYPES_ERROR
      });
    } else {
      const product = {
        title: data.title,
        description: data.description,
        code: data.code,
        price: data.price,
        status: true,
        stock: data.stock,
        category: data.category,
        thumbnail: [],
      };
      const productArr = productsRepository.saveProduct(product);
      res.send({ message: "success", payload: productArr });
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
  const pid = req.params.pid;
  try {
    if (pid) {
      const respon = await productsRepository.deleteProduct(pid);
      res.send({ message: "success", payload: respon });
    } else {
      res.send({ status: "Error", message: "El producto es invalido" });
    }
  } catch (error) {
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
