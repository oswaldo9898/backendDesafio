

export  const publicAccess = (req, res, next) => {
    if (req.session.user) return res.redirect('/productos');
    next();
}

export const privateAccess = (req, res, next) => {
    console.log('header '+req.headers.authorization)
    // console.log(req.sessionStore.sessions)
    // console.log(JSON.parse(req.sessionStore.sessions))
    if (!req.session.user) return res.redirect('/login');
    //if (!req.sessionStore.sessions.user) return res.redirect('/login');
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
    if (req.session.user.role == 'admin') return res.redirect('/productos');
    next();
}