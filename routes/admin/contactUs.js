const express = require('express');
const ContactUs = require('../../controllers/contactUs');
// const ContactUs = require('../../models/contactUs');

const router = new express.Router();

router.post('/contactUs', ContactUs.submitContactForm);

module.exports = router;
