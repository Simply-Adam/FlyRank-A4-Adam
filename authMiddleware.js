const supabase = require('./supabase');

async function authMiddleware(req, res, next) {

    const authHeader = req.headers.authorization;

    // check for bearer token
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
            error: 'Access token required'
        });
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({
            error: 'Access token required'
        });
    }

    // verify token
    const { data, error } = await supabase.auth.getUser(token);

    if (error || !data.user) {
        return res.status(401).json({
            error: 'Invalid or expired token'
        });
    }

    // save user and token for the route
    req.user = data.user;
    req.token = token;

    next();
}

module.exports = authMiddleware;