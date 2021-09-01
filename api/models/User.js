const { Schema, model } = require('mongoose')

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
    },
    firts_name: {
        type: String,
        require: true
    },
    last_name: {
        type: String,
        require: true
    },
    phone: {
        type: Number,
        required: true
    },
    active: {
        type: Boolean,
        default: false
    },
    user_role: {
        enum: ['admin', 'user'],
        default: 'user',
        required: true
    },
    address_line1:{
        type: String
    },
    address_line2:{
        type: String
    },
    city:{
        type: String
    },
    state:{
        type: String
    },
    postal_code:{
        type: Number
    },
    country:{
        type: String
    }

})

module.exports = model('User', userSchema);

// billing_addres:{
//     type:STRING
// },
// email_notification:{
//     type:BOOLEAN
// },
// verifyCode:{
//     type: BIGINT
// },
// verifyCodeExpireDate:{
//     type: DATE
// },
// force_password:{
//     type: ENUM("sin pedir","pendiente","hecho"),
//     defaultValue: "sin pedir"
// },
// salt:{
//     type: STRING,
//     get() {
//         return() => this.getDataValue('salt')
//     }
// }

//https://stackoverflow.com/questions/14588032/mongoose-password-hashing