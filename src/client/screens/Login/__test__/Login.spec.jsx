import React from 'react';
import ReactDOM from 'react-dom';
import Login from '../Login';
import { LOGIN_MUTATION } from '../Login.mutation';

// import ReactTestUtils from 'react-dom/test-utils';

import { fullRender, fullDomRendering } from '../../../../test/testHelper';
// import { render } from '@testing-library/react'


const mocks = [
    {
        request: {
            mutation: LOGIN_MUTATION,
        },
        result: {
            data: {
                userLogin: { token: '1', firstName: 'Buck', lastName: 'bulldog' },
            },
        },
    },
];



describe('@Login', () => {
    it('renders default', () => {
        //const tree = fullRender(Login);
        // expect(tree.toJSON()).toMatchSnapshot();
    });



    it('@render full dom', () => {


        const wrapper = fullDomRendering(Login);

        console.log(wrapper)
        // const testInstance = wrapper.root;
        //
        // const button = testInstance.findByProps({type: 'submit'});
        //
        //
        // console.log(button.instance);
        // console.log(button.type);
        // console.log(button.parent);
        // console.log(button.children);
        //
        // button.simulate('click');
        // button.props.onClick()

        // ReactTestUtils.Simulate.onClick(button.root)
        // expect(wrapper).expect();
    });

})


