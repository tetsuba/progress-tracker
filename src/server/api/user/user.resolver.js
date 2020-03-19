const { createNewUser, findUser, updateUser, findEmail } = require('./user.CRUD');

module.exports = {
    Query: {
        isUserSessionExpired: async (_, args, context) => {
            try {
                return await findUser({
                    email: context.user,
                    password: context.password,
                })
            } catch (e) {
                return e
            }
        },
        getUserData: async (_, args, context) => {
            console.log('@@@@@@@@@@@@ getUserData: ', context)
            try {
                return await findUser({
                    email: context.user,
                    password: context.password,
                })
            } catch (e) {
                return e
            }
        }
    },

    Mutation: {
        newUser: async (_, args, context, info) => {
            try {
                return await createNewUser(args.input)
            } catch (err) {
                return err
            }
        },
        userLogin: async (_, args, context, info) => {
            try {
                return await findUser(args.input)
            } catch (err) {
                return err
            }
        },

        updateUserData: async (_, args, context, info) => {
            try {
                return await updateUser(args.input)
            } catch (err) {
                return err
            }
        },

        verifyEmail: async (_, args, context) => {
            try {
                return await findEmail({ email: args.input.email }, 'confirmEmail');
            } catch (err) {
                return err
            }
        },

        sendPasswordResetConfirmation: async (_, args, context) => {
            try {
                return await findEmail({ email: args.input.email }, 'resetPassword');
            } catch (err) {
                return err
            }
        },

        resetPassword: async (_, args, context) => {
            try {
                return /// await findEmail({ email: args.input.email }, 'resetPassword');
            } catch (err) {
                return err
            }
        },
    }
};



// NOTES
// fieldName: (parent, args, context, info) => data;


// parent:  An object that contains the result returned from the resolver on the parent type
// args:    An object that contains the arguments passed to the field
// context: An object shared by all resolvers in a GraphQL operation. We use the context to contain per-request state such as authentication information and access our data sources.
// info:    Information about the execution state of the operation which should only be used in advanced cases



