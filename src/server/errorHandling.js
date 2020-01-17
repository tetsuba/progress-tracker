
const errorName = {
    UNAUTHORIZED: 'UNAUTHORIZED',
    INCORRECT_USER_DETAILS: 'INCORRECT_USER_DETAILS'
};


const errorType = {
    UNAUTHORIZED: {
        message: 'Authentication is needed to get requested response',
        statusCode: 401,
        name: 'unauthorized',
    },
    INCORRECT_USER_DETAILS: {
        message: 'You have entered incorrect username or password',
        statusCode: 403,
        name: 'incorrect_user_details',
    },
};

const getErrorCode = (errorName) => {
    return errorType[errorName]
}

module.exports = {
    errorType,
    errorName,
    getErrorCode,
}
