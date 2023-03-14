import fs from "fs";

export default class ProductManager {

  constructor(ruta) {
    this.products = [];
    this.path = ruta;
    this.getProducts();
  }



  addProduct = async (product) => {
    const productIndex = this.products.findIndex(
      (e) => e.code === product.code
    );

    if (productIndex != -1) {
      return { message: "Error: el código que desea ingresar ya existe" };
    }

    if (this.products.length === 0) {
      product.id = 1;
    } else {
      product.id = this.products[this.products.length - 1].id + 1;
    }

    this.products.push(product);
    await fs.promises.writeFile(this.path,JSON.stringify(this.products, null, "\t"));
    return this.products;
  };



  getProducts = async () => {
    try {
      if (fs.existsSync(this.path)) {
        const data = await fs.promises.readFile(this.path, "utf-8");
        this.products = JSON.parse(data);
      }
      return this.products;
    } catch (e) {
      console.log(e);
    }
  };



  getProductById = async (id) => {
    await this.getProducts();
    const productIndex = this.products.findIndex((e) => e.id === id);

    if (productIndex === -1) {
      return [];
    } else {
      return [this.products[productIndex]];
    }
  };



  updateProduct = async (id, product) => {
    const productIndex = this.products.findIndex((e) => e.id === id);

    if (productIndex === -1) {
      return {
        status: "Error",
        message: "Not found: Producto a editar no encontrado",
      };
    } else {
      const update = this.products.map((element) => {
        if (element.id === id) {
          (element.title = product.title),
          (element.description = product.description),
          (element.code = product.code),
          (element.price = product.price),
          (element.status = product.status),
          (element.stock = product.stock),
          (element.category = product.category),
          (element.thumbnail = product.thumbnail);
        }
        return element;
      });
      this.products = update;
    }
    await fs.promises.writeFile(this.path,JSON.stringify(this.products, null, "\t"));
    return { status: "Success", message: "Producto editado correctamente" };
  };



  deleteProduct = async (id) => {
    const productIndex = this.products.findIndex((e) => e.id === id);
    console.log(productIndex);
    if (productIndex === -1) {
      return {
        status: "Error",
        message: "Not found: Producto ha eliminar no encontrado",
      };
    }
    this.products.splice(productIndex, 1);
    await fs.promises.writeFile(
      this.path,
      JSON.stringify(this.products, null, "\t")
    );
    return {
      status: "Success",
      message: "El Producto se eliminó exitosamente",
    };
  };
}
