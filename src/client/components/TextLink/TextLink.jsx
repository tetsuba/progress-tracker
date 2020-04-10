import React from 'react'

export default function TextLink({eventHandler, children}) {
    const styles = {color: '#007bff', cursor: 'pointer'};
    return (
        <span
            style={styles}
            id="forgotPasswordButton"
            onClick={eventHandler}
        >
            { children }
        </span>
    )
}
