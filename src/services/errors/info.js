export const productErrorInfo = (product) => {
    return `Una o más propiedades están incompletas o son invalidas.
        Lista de las propiedades requeridas:
        Titulo: necesita que sea de tipo String, recibimos ${product.title} -
        Categoria: necesita que sea de tipo String, recibimos ${product.category} -
        Descripcion: necesita que sea de tipo String, recibimos ${product.description} -
        Precio: necesita que sea de tipo String, recibimos ${product.price} -
        Stock: necesita que sea de tipo String, recibimos ${product.stock}`
}

export const productCartErrorInfo = (user) => {
    return `El ID: ${user.first_name} no es valido.
            Recuerde que no puede enviar un ID ' ' o undefinid.`
}