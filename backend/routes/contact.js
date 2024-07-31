const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const mailgun = require('mailgun-js');
require('dotenv').config();

// Initialize Mailgun
const mg = mailgun({
    apiKey: process.env.MAILGUN_API_KEY,
    domain: process.env.MAILGUN_DOMAIN
  });

router.post('/mail', async (req, res) => {
    const { name, topic, message } = req.body;

    const data = {
        from: 'WasteWise Support <mailgun@sandbox9a2aec7d91a7477ab57b2575b5558b63.mailgun.org>',
        to: 'wastewise2@gmail.com',
        subject: `New message from ${name}`,
        text: `Topic: ${topic}\n\nMessage: ${message}`
    };

    try {
        await mg.messages().send(data);
        res.status(200).send('Message sent successfully!');
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('An error occurred while sending the message.');
    }
});


module.exports = router;