import { testRendererFull } from '../../../../test/testHelper'
import BreadCrumbs from '../BreadCrumbs'
import { CRUMBS_KEY } from '../crumbs'

jest.mock('react-router-dom', () => ({
  Link: ({ children }) => children,
}))

describe('<BreadCrumbs>', () => {
  it('should render myAccount', () => {
    const wrapper = testRendererFull(BreadCrumbs, {
      crumbKey: CRUMBS_KEY.MY_ACCOUNT,
    })
    expect(wrapper).toMatchSnapshot()
  })

  it('should render Students', () => {
    const wrapper = testRendererFull(BreadCrumbs, {
      crumbKey: CRUMBS_KEY.STUDENTS,
    })
    expect(wrapper).toMatchSnapshot()
  })

  it('should render Student', () => {
    const wrapper = testRendererFull(BreadCrumbs, {
      crumbKey: CRUMBS_KEY.STUDENT,
      id: 'id1234',
    })
    expect(wrapper).toMatchSnapshot()
  })

  it('should render abc', () => {
    const wrapper = testRendererFull(BreadCrumbs, {
      crumbKey: CRUMBS_KEY.ABC,
      name: 'John',
    })
    expect(wrapper).toMatchSnapshot()
  })
})
