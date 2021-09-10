const { Schema, model } = require('mongoose');

const roleSchema = new Schema({
name: {
    type: String
},
versionkey: {
    required: false
},
});

module.exports = model('Role', roleSchema);

