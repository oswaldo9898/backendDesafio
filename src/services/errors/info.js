export const generateUserErrorInfo = (user) => {
    return `Una o más propiedades están incompletas o son invalidas.
        Lista de las propiedades requeridas:
        nombre: necesita que sea de tipo String, recibimos ${user.first_name}
        apellido: necesita que sea de tipo String, recibimos ${user.last_name}
        email: necesita que sea de tipo String, recibimos ${user.email}`
}