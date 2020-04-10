
// TODO: Delete this function and use the custom hook "useInputChange"
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

export const passwordsDoNotMatched = ({password1, password2}) =>
    !(password1 === password2);

// Read this for more information
// https://www.robinwieruch.de/conditional-rendering-react#multiple-conditional-renderings-in-react
export function getLoginStatus(loading, reset) {
    return loading
        ? 'loading'
        : reset
            ? 'reset'
            : 'form';
}

export function getRestPasswordStatus(confirmation, resetPasswordOptions) {
    if (confirmation.loading || resetPasswordOptions.loading) return 'loading';
    if (resetPasswordOptions.data && resetPasswordOptions.data.resetPassword.confirmation) return 'success';
    if (confirmation.error)  return 'error';
    if (confirmation.data)  return 'form';
}