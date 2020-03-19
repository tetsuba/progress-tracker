

export const handleInputChange = (event, setInputs) => {
    event.persist();
    setInputs(inputs => (
        {...inputs, [event.target.name]: event.target.value})
    );
};

export const passwordMatchError = ({password1, password2}) => {
    if (password2.length === 0) return false;

    return !password1.startsWith(password2);
};

export const passwordsMatched = ({password1, password2}) =>
    !(password1 === password2);
