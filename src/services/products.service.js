import Products from "../dao/dbManager/products.js";
import ProductsRepository from "../repository/products.repository.js";
import config from "../config/config.js";
import { sendEmailDeletProduct } from '../utils/sendEmail/index.js';

const productsManager = new Products();
const productsRepository = new ProductsRepository(productsManager);


const getProducts = async (limit, page, query, sort) => {
  const products = await productsRepository.getProducts(limit, page, query, sort);
  return products;
};



const getProduct = async (pid) => {
  const product = await productsRepository.getProduct(pid);
  return product;
};


const getProductRecomend = async(category) => {
  const products = await productsRepository.getProductRecomend(category);
  return products;
}



const saveProduct = async (data, file) => {

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
  return productArr;
}



const updateProduct = (pid, data, file) => {

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

  if (file?.filename) {
    product.portada = file.filename;
  }

  const respon = productsRepository.updateProduct(pid, product);
  return respon;
};




const deleteProduct = async (pid, userSesion) => {
  const product = await productsRepository.getProduct(pid);

  if (userSesion == config.adminEmail) {

    if (product.owner !== userSesion) {
      sendEmailDeletProduct(product.owner, product.title);
    }
    const respon = await productsRepository.deleteProduct(pid);
    return respon

  } else {

    if (product.owner == userSesion) {
      sendEmailDeletProduct(product.owner, product.title);
      const respon = await productsRepository.deleteProduct(pid);
      return respon;

    } else {
      return null;
    }
  }
};



export {
  getProducts,
  getProduct,
  getProductRecomend,
  saveProduct,
  updateProduct,
  deleteProduct
}
