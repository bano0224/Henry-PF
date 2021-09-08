const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new Schema({
  /* local: {
    email: String,
    password: String,
  }, */
  email: {
    type: String,
    required: true,
    /* unique: true, */
  },
  facebook: {
    id: String,
    token: String,
    email: String,
    password: String,
  },
  google: {
    id: String,
    token: String,
    email: String,
    password: String,
  },
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true
  },
  first_name: {
    type: String,
    /* require: true, */
  },
  last_name: {
    type: String,
    /* require: true, */
  },
  phone: {
    type: Number,
    /* required: true, */
  },
  active: {
    type: Boolean,
    default: true,
  },
  role: [{
    ref: 'Role',
    type: Schema.ObjectId,
    /* required:true, */
  }],
  address_line1: {
    type: String,
  },
  address_line2: {
    type: String,
  },
  city: {
    type: String,
  },
  state: {
    type: String,
  },
  postal_code: {
    type: Number,
  },
  country: {
    type: String,
  },
  email_notification: {
    type: Boolean,
  },
  verifyCode: {
    type: Number,
  },
  token: [{
      type: String,
      required:true
    }]

});

userSchema.statics.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};
//recibier la password y comparar la passwod con la actual si quiere modificarla
userSchema.statics.matchPassword = async (password, receivePassword) => {
  return await bcrypt.compare(password, receivePassword);
};

module.exports = model("User", userSchema);
