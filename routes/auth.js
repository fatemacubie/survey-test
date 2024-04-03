// routes/auth.js
const express = require('express');
const passport = require('../config/passport');

const router = express.Router();

router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return next(err);
        }

        if (!user) {
            return res.status(401).json({ error: info.message });
        }

        req.login(user, (loginErr) => {
            if (loginErr) {
                return next(loginErr);
            }

            return res.json({ success: 'Logged in successfully' });
        });
    })(req, res, next);
});

router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(400).json({ error: 'Logout error' });
        }
        res.json({ success: 'Logged out successfully' });
    });
});
module.exports = router;
