const { createNewUser, findUser, updateUser } = require('./user.CRUD');

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
        getUsers: async (_, args, context) => {
            try {
                if (!context.user) return null;
                return await findUser({})
            } catch (err) {
                return err
            }
        },
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
    }
};



// NOTES
// fieldName: (parent, args, context, info) => data;


// parent:  An object that contains the result returned from the resolver on the parent type
// args:    An object that contains the arguments passed to the field
// context: An object shared by all resolvers in a GraphQL operation. We use the context to contain per-request state such as authentication information and access our data sources.
// info:    Information about the execution state of the operation which should only be used in advanced cases



