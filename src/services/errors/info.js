export const productErrorInfo = (user) => {
    return `Una o más propiedades están incompletas o son invalidas.
        Lista de las propiedades requeridas:
        nombre: necesita que sea de tipo String, recibimos ${user.first_name}
        apellido: necesita que sea de tipo String, recibimos ${user.last_name}
        email: necesita que sea de tipo String, recibimos ${user.email}`
}

export const productCartErrorInfo = (user) => {
    return `El ID: ${user.first_name} no es valido.
            Recuerde que no puede enviar un ID ' ' o undefinid.`
}