'use strict';

var connection = require("./index"),
    mongoose = connection.mongoose,
    Schema = mongoose.Schema,
    bcrypt = require('bcrypt'),

    /**
     * Schema User
     * @type {*|Schema}
     */
    UsersSchema = new Schema(
        {
            _id: Schema.Types.ObjectId,
            username: {
                type: String,
                trim: true,
                required: true
            },
            email: {
                type: String,
                trim: true,
                unique: true,
                required: true
            },
            password: {
                type: String,
                minLength: 6,
                required: false
            },
            resetPasswordToken: {
                type: String,
                required: false
            },
            resetPasswordExpires: {
                type: String,
                required: false
            },
            resetPasswordIp: {
                type: String,
                required: false
            },
            oauth: {
                id: {
                    type: String,
                    required: false
                },
                provider: {
                    type: String,
                    required: false
                },
                token: {
                    type: String,
                    required: false
                }
            }
        }
    );

/**
 * Generating a hash Password
 * @param password
 */
UsersSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

/**
 * Checking Password.
 * @param password
 */
UsersSchema.methods.validPassword = function (password) {
    return (typeof this.password !== 'undefined') ? bcrypt.compareSync(password, this.password) : false;
};

/**
 * Return objectId.
 */
UsersSchema.methods.newObjectId = function () {
    return new mongoose.Types.ObjectId;
};

/**
 * Create model User
 */
var Users = mongoose.model("usersaccount", UsersSchema);

/**
 * Export model User
 */
module.exports.Users = Users;