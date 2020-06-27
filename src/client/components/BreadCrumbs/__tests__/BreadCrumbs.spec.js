import { testRendererFull } from '../../../../test/testHelper'
import BreadCrumbs from '../BreadCrumbs'
import CRUMBS, { CRUMBS_KEY } from '../crumbs'

jest.mock('react-router-dom', () => ({
  Link: ({ children }) => children,
}))

describe('<BreadCrumbs>', () => {
  function expectToBeALink(link, crumb) {
    expect(link.children).toEqual(crumb.name)
    expect(link.to).toEqual(crumb.path)
  }

  describe('[SCREEN]: MyAccount', () => {
    const [crumbHome, crumbMyAccount] = CRUMBS[CRUMBS_KEY.MY_ACCOUNT]

    const wrapper = testRendererFull(BreadCrumbs, {
      crumbKey: CRUMBS_KEY.MY_ACCOUNT,
    })

    it('should render crumbs "Home / My Account"', () => {
      expect(wrapper).toMatchSnapshot()
    })

    it('should render "Home" as a Link', () => {
      expectToBeALink(wrapper.find('Link').props(), crumbHome)
    })

    it('should render "MyAccount" as list', () => {
      expect(wrapper.find('BreadcrumbItem > li').props().children).toEqual(
        crumbMyAccount.name
      )
    })
  })
  describe('[SCREEN]: Students', () => {
    const [crumbHome, crumbStudents] = CRUMBS[CRUMBS_KEY.STUDENTS]

    const wrapper = testRendererFull(BreadCrumbs, {
      crumbKey: CRUMBS_KEY.STUDENTS,
    })

    it('should render crumbs "Home / Students"', () => {
      expect(wrapper).toMatchSnapshot()
    })

    it('should render "Home" as a Link', () => {
      expectToBeALink(wrapper.find('Link').props(), crumbHome)
    })

    it('should render "Students" as list', () => {
      expect(wrapper.find('BreadcrumbItem > li').props().children).toEqual(
        crumbStudents.name
      )
    })
  })
  describe('[SCREEN]: Student', () => {
    const [crumbHome, crumbStudents] = CRUMBS[CRUMBS_KEY.STUDENT]
    const props = {
      crumbKey: CRUMBS_KEY.STUDENT,
      name: 'John',
    }
    const wrapper = testRendererFull(BreadCrumbs, props)

    it('should render crumbs "Home / Students / { student name }"', () => {
      expect(wrapper).toMatchSnapshot()
    })

    it('should render "Home" as a Link', () => {
      expectToBeALink(wrapper.find('Link').get(0).props, crumbHome)
    })

    it('should render "Students" as a Link', () => {
      expectToBeALink(wrapper.find('Link').get(1).props, crumbStudents)
    })

    it('should render "Student" as list and replace student name with John', () => {
      expect(wrapper.find('BreadcrumbItem > li').props().children).toEqual(
        props.name
      )
    })
  })
  describe('[SCREEN]: AlphabetAssessment', () => {
    const [crumbHome, crumbStudents, crumbStudent, crumbAlphabet] = CRUMBS[
      CRUMBS_KEY.ALPHABET
    ]
    const props = {
      crumbKey: CRUMBS_KEY.ALPHABET,
      name: 'John',
      id: 'ID123456789',
    }
    const wrapper = testRendererFull(BreadCrumbs, props)

    it('should render crumbs "Home / Students / { student name }, / ABC"', () => {
      expect(wrapper).toMatchSnapshot()
    })

    it('should render "Home" as a Link', () => {
      expectToBeALink(wrapper.find('Link').get(0).props, crumbHome)
    })

    it('should render "Students" as a Link', () => {
      expectToBeALink(wrapper.find('Link').get(1).props, crumbStudents)
    })

    it('should render "Student" as Link and replace student name with John', () => {
      crumbStudent.name = props.name
      crumbStudent.path = crumbStudent.path.replace('{id}', props.id)
      expectToBeALink(wrapper.find('Link').get(2).props, crumbStudent)
    })

    it('should render "Student" as list and replace student name with John', () => {
      expect(wrapper.find('BreadcrumbItem > li').props().children).toEqual(
        crumbAlphabet.name
      )
    })
  })
})
