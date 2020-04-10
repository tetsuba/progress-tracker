import { testRenderer } from "../../../../test/testHelper";
import TextLink from "../TextLink";


describe('<Textlink>', () => {
    describe('@Render', () => {
        const props = {
            eventHandler: jest.fn(),
            children: ['This is a text link'],
        };

        it('should render component', () => {
            const wrapper = testRenderer(TextLink, props);
            expect(wrapper).toMatchSnapshot()
        });
    })

    describe('@Event', () => {
        const props = {
            eventHandler: jest.fn(),
            children: ['This is a text link'],
        };

        it('should call eventHandler on event click', () => {
            const wrapper = testRenderer(TextLink, props);
            wrapper.prop('onClick')();
            expect(props.eventHandler).toHaveBeenCalledTimes(1)
        });
    })
});