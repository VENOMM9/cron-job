const birthdata = require('./model/form')
const formSubmit= (req, res) => {
    const { username, email, dob } = req.body;

    birthdata.create({ username, email, dob });
    console.log('record saved');

    res.redirect('/');
  };

  module.exports ={formSubmit}