import React from 'react';
import { render } from '@testing-library/react'
import { shallow, mount } from "enzyme";


import renderer from 'react-test-renderer'; // https://reactjs.org/docs/test-renderer.html


import { ApolloProvider } from 'react-apollo';
import GlobalContext from '../client/context/GlobalContext';
import { BrowserRouter as Router, MemoryRouter } from 'react-router-dom';
import { MockedProvider } from '@apollo/react-testing';





import { client } from '../index';

export const fullRender = (Node, mock) => {
    return renderer
        .create(
            <ApolloProvider client={client}>
                <GlobalContext>
                    <Router>
                        <MockedProvider><Node /></MockedProvider>
                    </Router>
                </GlobalContext>
            </ApolloProvider>
        )
};





export const fullDomRendering = (Node, mock) => {
    return mount(
        <MemoryRouter>
            <Node />
        </MemoryRouter>
    )
};
