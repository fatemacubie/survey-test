const express = require('express');

const Router = express.Router();

Router.use(require('./contactUs'));
Router.use(require('./product'));

module.exports = Router;
