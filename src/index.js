import React from 'react';
import { render } from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { ApolloLink } from 'apollo-link';
import { onError } from 'apollo-link-error';

// CSS
import 'bootstrap/dist/css/bootstrap.min.css';

// COMPONENT
import App from './client/App';

// CONTEXT
import GlobalContext from './client/context/GlobalContext';

const cache = new InMemoryCache();
const link = new HttpLink({
    uri: '/graphql',
    credentials: 'same-origin',
});

const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = localStorage.getItem('ptToken');
    return {
        headers: {
            ...headers,
            authorization: token ? token : '',
        }
    }
});

const errorLink = onError(({ graphQLErrors }) => {
    // This breaks on session timeout when i was viewing MyAccount
    // TODO: Is this the correct solution, investigate further.
    // This captures when a token session has expired and will
    // redirect a user to the login page
    if (graphQLErrors[0].name === 'unauthorized') {
        console.log('Not unauthorized')
        localStorage.setItem('ptToken', '')
        window.history.href = '/login'
    }
});

export const client = new ApolloClient({
    link: ApolloLink.from([authLink, errorLink, link]),
    cache,
    defaultOptions: {
        watchQuery: {
            errorPolicy: 'all'
        }
    }
});

const Root = () => {
    return (
        <ApolloProvider client={client}>
            <GlobalContext>
                <App />
            </GlobalContext>
        </ApolloProvider>
    )
};

render(<Root />, document.getElementById('root'));
