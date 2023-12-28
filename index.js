const express= require("express")
const cron = require('node-cron')
const nodemailer = require('nodemailer')
const bodyParser = require('body-parser')
const connectDB = require('./db/db')
const birthdata = require('./model/form')
require('dotenv').config()

const port = process.env.PORT||3000

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

//form submission
app.post('/submit', async (req, res) => {
    const { name, email, dob } = req.body;

    await birthdata.create({ name, email, dob });
    console.log('record saved');

    res.redirect('/response.html');
  })

//cron job

const birthdayCronJob = cron.schedule('0 7 * * *', async () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); 
  
    console.log(today);
    console.log('here1');
  
    const users = await birthdata.find({ dob: { $gte: today, $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000) } });
    console.log(users);
  
    users.forEach(user => {
      console.log(user.email);
      sendBirthdayEmail(user.email, user.name);
      console.log('here2');
    });
  });
  
  birthdayCronJob.start();
  

//mail ops

  const sendBirthdayEmail = (email, name) => {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.USER, 
        pass: "eype djju koyx jawu" 
      }
    });

    const mailOptions = {
      from: process.env.USER,
      to: email,
      subject: 'Happy Birthday!',
      text: `Dear ${name},\n\n Happy Birthday! Wishing you a fantastic day filled with joy and happiness.\n\n Best regards,\n Tahir Adeleye`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log('Email sent: ' + info.response);
    });
  };

const start = async ()=> {
    try {
        await connectDB(process.env.URI)
        app.listen(port, ()=>{
            console.log(`connected to the db sucessfully`);
            console.log(`app is listening on port ${port}`);
        })
    } catch (error) {
        console.log("error starting app", error)
    }
    
}

start()