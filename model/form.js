const mongoose = require('mongoose');


const formSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    dob:{type:Date, required:true}
  });

  module.exports = mongoose.model('form_data', formSchema)