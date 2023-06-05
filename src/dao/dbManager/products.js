import  productModel  from "../models/products.js";

export default class Products {

    constructor(){}

    getProducts = async(limit=10, page=1, query='', sort='') => {
        const products = await productModel.paginate({title: {$regex: query}},{limit:limit, page:page, sort: {price: sort}})
        return products;
    }

    saveProduct = async(product) => {
        const result = await productModel.create(product);
        return result;
    }

    getProduct = async(id) => {
        const products = await productModel.findById({_id:id});
        return products;
    }

    updateProduct = async(id, product) => {
        const result = await productModel.updateOne({_id:id}, product);
        return result;
    }

    deleteProduct = async(id) => {
        const result = await productModel.findByIdAndDelete({_id:id});
        return result;
    }

}