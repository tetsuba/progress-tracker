import '@testing-library/jest-dom/extend-expect';
import '../node_modules/jest-enzyme/lib/index.js';
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
Enzyme.configure({ adapter: new Adapter() });
