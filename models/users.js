'use strict';

var connection = require("./index"),
    mongoose = connection.mongoose,
    Schema = mongoose.Schema;
var bcrypt = require('bcrypt');

/**
 * Schema User
 * @type {*|Schema}
 */
var UsersSchema = new Schema(
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
            default: '',
            minLength: 6,
            required: true
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
 * Checking Password
 * @param password
 */
UsersSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

/**
 * Create model User
 */
var Users = mongoose.model("usersaccount", UsersSchema);

/**
 * Export model User
 */
module.exports.Users = Users;

/**
 * Find user for Passport
 * @param id
 * @param done
 */
exports.findUser = function (id, done) {
    Users.findById(id, function (err, user) {
        done(err, user);
    });
};

/**
 * Strategy local sing in for Passport
 * @param req
 * @param email
 * @param password
 * @param done
 */
exports.login = function (req, email, password, done) {
    Users.findOne({email: email}, function (err, user) {
        if (err) {
            return done(err);
        }
        if (!user) {
            req.response.setMsg('Incorrect e-mail.');
            return done(null, false);
        }
        if (!user.validPassword(password)) {
            req.response.setMsg('Incorrect password.');
            return done(null, false);
        }
        req.response.setSuccess(true);
        return done(null, user);
    });
};

/**
 * Strategy local sing up for Passport
 * Create User
 * @param req
 * @param email
 * @param password
 * @param done
 */
exports.create = function (req, email, password, done) {

    var data = req.body,
        validaEmail = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;

    if (!data.username) {
        req.response.setMsg('Please enter your username !');
    }
    if (!validaEmail.test(email)) {
        req.response.setMsg('Please enter a valid email address !');
    }
    if (password.length <= 5) {
        req.response.setMsg('Your password must have more than 6 characters !');
    }
    if (password != data.confirmPassword) {
        req.response.setMsg('Make sure your passwords are the same !');
    }

    Users.findOne({email: email}, function (err, findUser) {
        if (err) {
            return done(err);
        }

        if (findUser) {
            req.response.setMsg('E-mail already registered.');
        }

        if (req.response.hasMsg()) {
            return done(null, false);
        }

        var newUser = new Users();
        newUser._id = new mongoose.Types.ObjectId;
        newUser.username = data.username;
        newUser.email = email;
        newUser.password = newUser.generateHash(password);

        newUser.save(function (err, user) {
            if (err) {
                return done(err);
            } else {
                req.response.setSuccess();
                return done(null, user);
            }
        });
    });
};