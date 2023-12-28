const nodemailer = require('nodemailer')
require('dotenv').config()

const sendBirthdayEmail = (email, username) => {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.USER, 
        pass: process.env.PASS 
      }
    });

    const mailOptions = {
      from: process.env.USER,
      to: email,
      subject: 'Happy Birthday!',
      text: `Dear ${username},\n\nHappy Birthday! Wishing you a fantastic day filled with joy and happiness.\n\nBest regards,\n Tahir Adeleye`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log('Email sent: ' + info.response);
    });
  };

  module.exports ={sendBirthdayEmail}