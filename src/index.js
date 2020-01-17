import React from 'react';
import { render } from 'react-dom';
import ApolloClient from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
// import { onError } from "apollo-link-error";
import { ApolloLink } from 'apollo-link';

import 'bootstrap/dist/css/bootstrap.min.css';
import App from './client/App';
import GlobalContext from './client/context/GlobalContext';


// const errorLink = onError(({ graphQLErrors, networkError }) => {
//     if (graphQLErrors[0]) {
//         console.log('graphQLErrors: ', graphQLErrors)
//     }
// });


const cache = new InMemoryCache();
const link = new HttpLink({
    uri: process.env.REACT_APP_APPOLO_CLIENT_LINK_URI,
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
