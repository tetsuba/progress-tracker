import React from 'react';
import { shallow, mount } from "enzyme";
import { MockedProvider } from '@apollo/react-testing';
import GlobalContext from '../client/context/GlobalContext';

// Local Storage global setup
import './localStorage'

export function testRenderer(Node, props) {
  return shallow(
    <Node { ...props } />
  )
}

export function testRendererFull(Node, props) {
  return mount(
    <Node { ...props } />
  )
}

export function graphRenderer(Node, mocks, props) {
  const container = document.createElement("div");
  container.setAttribute('id', 'root');
  document.body.appendChild(container);

  return mount(
    <MockedProvider mocks={mocks} addTypename={false}>
      <GlobalContext>
        <Node { ...props } />
      </GlobalContext>
    </MockedProvider>
  )
}

// TODO: Investigate for a better solution.
// useMutation is stuck on loading and requires this hack to delay
// the call for an update.
export async function delay() {
  return await new Promise(resolve => setTimeout(resolve));
}
// const wait = (amount = 0) => new Promise(resolve => setTimeout(resolve, amount));


export function updateTextInput(wrapper, name, value) {
  wrapper.find({ name }).get(0).props.onChange({
    persist: jest.fn(),
    target: { name, value },
  })
}
