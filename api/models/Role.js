import { Schema, model } from 'moongose';

const rolSchema = new Schema({
name: {
    type: String
},
versionkey: {
    required: false
},
});

module.exports = model('Role', roleSchema);

