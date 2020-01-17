const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
require('./user.modal');
const User = mongoose.model('user');
const { errorName } = require('../../errorHandling');
const { createToken } = require('../../server.utils');

async function findUser(data) {
    try {
        console.log('findUser', data);

        if (!data.email) {
            throw new Error(errorName.INCORRECT_USER_DETAILS)
            return null
        }

        const user = await User.findOne({ email: data.email });

        if (!user || user.password !== data.password) {
            throw new Error(errorName.INCORRECT_USER_DETAILS)
        }

        const token = createToken(user);

        console.log('findUser', user, token);

        return {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            id: user._id,
            token
        }
    } catch(error) {
        console.log('findUser error', error);
        return error
    }
}

// RegisterUser
async function createNewUser(data) {
    const user = await User.findOne({ email: data.email});

    if(user) {
        // TODO: how to handle this error better.
        return new Error('User exists')
    }

    // TODO: investigate which lib to use for authentication
    // TODO:  look into this https://www.apollographql.com/docs/react/v2.5/recipes/authentication/
    const newUser = await User.create(data);
    return { ...newUser, id: newUser._id };
}

async function updateUser(data) {
    console.log('updateUser:', data);
    try {
        const user = await User.findById(data.id);
        console.log('User:', user);
        user.firstName = data.firstName;
        user.lastName = data.lastName;
        return await user.save()
    } catch (e) {
        console.log('findUser error', e);
        return e;
    }

}

module.exports = {
    findUser,
    createNewUser,
    updateUser,
};
