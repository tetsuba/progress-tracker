import { render } from '@testing-library/react'
import Home from '../Home'
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { BrowserRouter as Router } from 'react-router-dom'
// import ReactTestUtils from 'react-dom/test-utils';
import renderer from 'react-test-renderer'

describe.skip('@Home', () => {
  // const {getByText} =  render(<Login />);
  // console.log('root', root)

  it('renders default', () => {
    // const { getByText, debug } = renderer(<Router><Home /></Router>);
    // debug()
    // expect(getByText('Welcome to Progress Tracker...')).toMatchSnapshot();

    const tree = renderer
      .create(
        <Router>
          <Home />
        </Router>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
