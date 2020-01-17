const { mergeResolvers } = require('../server.utils');

describe('Server Utils', () => {
    describe('@mergeResolvers', () => {
        test('should merge querys and mutations', () => {
            const resolverMock = [
                {
                    Query: {
                        students: [],
                        getStudent: []
                    },
                    Mutation: {
                        addNewStudent: []
                    }
                },
                {
                    Query:{
                        isUserSessionExpired: [],
                        getUsers: []
                    },
                    Mutation: {
                        newUser: [],
                        userLogin: []
                    },
                },
            ];
            const expected = {
                "Mutation": {
                    "addNewStudent": [],
                    "newUser": [],
                    "userLogin": []
                },
                "Query": {
                    "getStudent": [],
                    "getUsers": [],
                    "isUserSessionExpired": [],
                    "students": []
                }
            }
            expect(mergeResolvers(resolverMock)).toEqual(expected)
        });
    });

});




