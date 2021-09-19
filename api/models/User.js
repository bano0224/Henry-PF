const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new Schema({
  email: {
    type: String,
    required: [true, 'Nombre requerido'],
    unique: true,
    match: [/.+\@.+\..+/, 'Por favor ingrese un correo válido']
  },
  userName: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength:[8,'La contraseña debe tener 8 caracteres como mínimo'],
  },
  firstName: {
    type: String,
    require: true,
  },
  lastName: {
    type: String,
    require: true,
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
    }],
  resetToken: {
    type: String,
  },
  expireToken: {
    type: Date,
  },
  subscription: {
    type: Boolean,
    default: false,
  },
  expiredLogin: {
    type: Number,
    default: 0
  }
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
