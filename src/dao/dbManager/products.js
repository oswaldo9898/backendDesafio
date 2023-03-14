import { productModel } from "../models/products.js";

export default class Products {

    constructor(){}

    getAll = async() => {
        const products = await productModel.find();
        return products.map(product => product.toObject());
    }

    save = async(product) => {
        const result = await productModel.create(product);
        return result;
    }

    getProductById = async(id) => {
        const products = await productModel.findById({_id:id});
        return products;
    }

    update = async(id, product) => {
        const result = await productModel.updateOne({_id:id}, product);
        return result;
    }

    delete = async(id) => {
        const result = await productModel.findByIdAndDelete({_id:id});
        return result;
    }

}