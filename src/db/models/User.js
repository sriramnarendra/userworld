'use strict';
const db = require('../');

const Schema = db.Schema;
const userSchema = new Schema({
    userId: Schema.Types.ObjectId,
    firstName: String,
    lastName: String,
    birthday: Date,
    creditcard: String,
    gender: String,
    email: String,
    createTs: Date,
    createUserId: String,
    lastChangeTs: Date,
    lasteChangeUserId: String
});

userSchema.set('toObject', { versionKey: false });
const User = db.model('User', userSchema);

module.exports = {
    model: User,
    schema: userSchema
};