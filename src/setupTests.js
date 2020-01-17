import '@testing-library/jest-dom/extend-expect';
import '../node_modules/jest-enzyme/lib/index.js';

import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";

// import jsdom from 'jsdom';
// const {JSDOM} = jsdom;
// const {document} = (new JSDOM('<!doctype html><html><body><div id="root"></div></body></html>')).window;
// global.document = document;
// global.window = document.defaultView;

// const { JSDOM } = require('jsdom');
//
// const jsdom = new JSDOM('<!doctype html><html><body><div id="root"></div></body></html>');
// const { window } = jsdom;
//
Enzyme.configure({ adapter: new Adapter() });
//
// // jest.mock('react-dom');
//
// global.window = window;
// global.document = window.document;


// const { JSDOM } = require('jsdom');
//
// const jsdom = new JSDOM(`
// <!DOCTYPE html>
// <html lang="en">
//     <body>
//         <div id="root"></div>
//     </body>
// </html>
// `);
//
// window = jsdom.window

