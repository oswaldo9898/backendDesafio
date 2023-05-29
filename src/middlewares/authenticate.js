

export  const publicAccess = (req, res, next) => {
    if (req.session.user) return res.redirect('/productos');
    next();
}

export const privateAccess = (req, res, next) => {
    if (!req.session.user) return res.redirect('/login');
    next();
}

export const adminAccess = (req, res, next) => {
    if (req.session.user.role !== 'admin') return res.redirect('/productos');
    next();
}

export const adminPremiumAccess = (req, res, next) => {
    if (req.session.user.role !== 'admin' && req.session.user.role !== 'premium') return res.redirect('/productos');
    next();
}

export const userAccess = (req, res, next) => {
    if (req.session.user.role !== 'user') return res.redirect('/productos');
    next();
}