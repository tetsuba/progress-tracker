import React from 'react';
import { render } from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { ApolloLink } from 'apollo-link';

// CSS
import 'bootstrap/dist/css/bootstrap.min.css';

// COMPONENT
import App from './client/App';

// CONTEXT
import GlobalContext from './client/context/GlobalContext';

const cache = new InMemoryCache();
const link = new HttpLink({
    uri: '/graphql', //process.env.REACT_APP_APPOLO_CLIENT_LINK_URI,
});

// TODO: Draw diagram to keep track how it works
//       dont be a fool not too.
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

export const client = new ApolloClient({
    link: ApolloLink.from([authLink, link]),
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
