import EErrors from "../../services/errors/enums.js";


export default (error, req, res, next) => {
    switch(error.code) {
        case EErrors.INVALID_TYPES_ERROR:
            res.status(401).send({
                status: 'error',
                error: error.name,
                description: error.cause
            });
            break;
        default:
            res.send({
                status: 'error',
                error: 'unhabled error'
            });
            break;
    }
    next();
}
