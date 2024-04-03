const { errorMessages } = require('../config/message');

module.exports = function ensureRole(role) {
    return (req, res, next) => {
        if (req.isAuthenticated() && req.user.role === role) {
            return next();
        }
        return res.status(405).json({ error: errorMessages.UNAUTHORIZED_ACCESS });
    };
};
