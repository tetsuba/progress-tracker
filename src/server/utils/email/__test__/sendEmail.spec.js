const { getEmailMailOptions, sendMail } = require('../sendEmail')
jest.mock('nodemailer')
const nodemailer = require('nodemailer')

describe('@sendEmail', () => {
  describe('getEmailMailOptions', () => {
    it('should return the resetPassword html template and email subject', () => {
      const name = 'resetPassword'
      expect(getEmailMailOptions(name)).toMatchSnapshot()
    })

    it('should return the confirmEmail html template and email subject', () => {
      const name = 'confirmEmail'
      expect(getEmailMailOptions(name)).toMatchSnapshot()
    })

    it('should return a TypeError if a name is not provided', () => {
      expect.assertions(2)
      try {
        getEmailMailOptions()
      } catch (error) {
        expect(error).toBeInstanceOf(TypeError)
        expect(error).toHaveProperty(
          'message',
          "Cannot read property 'emailTemplateName' of undefined"
        )
      }
    })

    it('should return a TypeError if an incorrect name is not provided', () => {
      expect.assertions(2)
      try {
        getEmailMailOptions('incorrectName')
      } catch (error) {
        expect(error).toBeInstanceOf(TypeError)
        expect(error).toHaveProperty(
          'message',
          "Cannot read property 'emailTemplateName' of undefined"
        )
      }
    })
  })

  describe('sendMail', () => {
    it('should send an email', async () => {
      const sendMailMock = jest.fn()
      nodemailer.createTransport.mockReturnValue({ sendMail: sendMailMock })

      const token = '123456Token'
      const options = {
        html: `<html></html>`,
        subject: 'This is a subject',
      }

      await sendMail(token, options)
      expect(sendMailMock).toHaveBeenCalledTimes(1)
    })
  })
})
