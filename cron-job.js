const cron = require('node-cron')
birthdayCollection = require('./model/form')

const {sendBirthdayEmail} = require('./mail')
cron.schedule('0 7 * * *', ()=>{
    const today = new Date().toLocaleDateString('en-US', { month: '2-digit', day: '2-digit' })

    birthdayCollection.find({ dob: today }).toArray((err, results) => {
        if (err) throw err;
  
        // Send birthday emails to celebrants
        results.forEach((user) => {
          sendBirthdayEmail(user.email, user.username);
        });
      });
})