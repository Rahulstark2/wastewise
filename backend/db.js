const mongoose = require('mongoose');
require('dotenv').config();

const uri = process.env.MONGODB_URI;


mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.error('Failed to connect to MongoDB Atlas', err));

  const userSchema = new mongoose.Schema({
    firstName: {
      type: String,
      required: true,
      trim: true,
      maxLength: 50
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      maxLength: 50
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address']
    }
  });

  const additionalDetailsUserSchema = new mongoose.Schema({
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate: {
        validator: function(v) {
          return /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(v);
        },
        message: props => `${props.value} is not a valid email!`
      }
    },
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      validate: {
        validator: function(v) {
          return /^\d{10}$/.test(v);
        },
        message: props => `${props.value} is not a valid phone number!`
      }
    },
    address: {
      type: String,
      required: true,
      trim: true
    }
  });

  const scheduleSchema = new mongoose.Schema({
    selectedDate: {
      type: Date,
      required: true
    },
    selectedTruck: {
      id: {
        type: Number,
        required: true
      },
      license: {
        type: String,
        required: true,
        trim: true
      },
      driver: {
        type: String,
        required: true,
        trim: true
      }
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      validate: {
        validator: function(v) {
          return /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(v);
        },
        message: props => `${props.value} is not a valid email!`
      }
    }
  });
  
  const Schedule = mongoose.model('Schedule', scheduleSchema);
  const AdditionalDetailsUser  = mongoose.model('AdditionalDetailsUser', additionalDetailsUserSchema);

  
  
  const User = mongoose.model('User', userSchema);
  
  module.exports = {
    User,
    AdditionalDetailsUser,
    Schedule
  };