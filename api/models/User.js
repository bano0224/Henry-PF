const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },
  first_name: {
    type: String,
    require: true,
  },
  last_name: {
    type: String,
    require: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  active: {
    type: Boolean,
    default: false,
  },
  // user_role: {
  //     enum: ['admin', 'user'],
  //     required: true
  // },
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
});

userSchema.method.encryptPass = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

userSchema.method.matchPass = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = model("User", userSchema);
