export default class ProductsRepository {
    constructor(dao){
        this.dao = dao;
    }

    getProducts = async(limit, page, query, sort) => {
        const products = await this.dao.getProducts(limit, page, query, sort);
        return products;
    }

    getProduct = async(pid) => {
        const product = await this.dao.getProduct(pid);
        return product;
    }

    getProductRecomend = async(category) => {
        const products = await this.dao.getProductRecomend(category);
        return products;
    }

    saveProduct = async(product) => {
        const productArr = await this.dao.saveProduct(product);
        return productArr;
    }

    updateProduct = async(pid, product) => {
        const respon = await this.dao.updateProduct(pid, product);
        return respon;
    }

    deleteProduct = async(pid) => {
        const respon = await this.dao.deleteProduct(pid);
        return respon;
    }

}