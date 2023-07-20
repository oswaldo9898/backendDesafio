const publicAccess = (req, res, next) => {
    if (req.session.user) return res.redirect('/productos');
    next();
}

const privateAccess = (req, res, next) => {
    if (!req.session.user) return res.redirect('/login');
    next();
}

const adminAccess = (req, res, next) => {
    if (req.session.user.role !== 'admin') return res.redirect('/productos');
    next();
}

const adminPremiumAccess = (req, res, next) => {
    if (req.session.user.role !== 'admin' && req.session.user.role !== 'premium') return res.redirect('/productos');
    next();
}

const userAccess = (req, res, next) => {
    if (req.session.user.role == 'admin') return res.redirect('/productos');
    next();
}

export{
    publicAccess,
    privateAccess,
    adminAccess,
    adminPremiumAccess,
    userAccess
}
