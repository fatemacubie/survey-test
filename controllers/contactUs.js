const nodemailer = require('nodemailer');
const Contact = require('../models/contactUs');

exports.submitContactForm = async (req, res) => {
    try {
        const { name, email, message } = req.body;
        const newContact = new Contact({ name, email, message });
        await newContact.save();

        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_SERVER,
            port: 587,
            secure: false,
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD,
            },
        });

        const info = await transporter.sendMail({
            from: '"Your Shop" <yourshop@example.com>', // sender address
            to: 'recipient@example.com', // list of receivers
            subject: 'New Contact Form Submission', // Subject line
            html: `<p>Name: ${name}</p><p>Email: ${email}</p><p>Message: ${message}</p><p>User's Email: ${email}</p>`, // Include user's email in the body
        });

        console.log('Message sent: %s', info.messageId);

        res.status(201).json({ message: 'Message sent successfully!' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to send message' });
    }
};
