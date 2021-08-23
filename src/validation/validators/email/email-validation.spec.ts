import faker from 'faker'
import { InvalidFieldError } from '@/validation/errors'
import { EmailValidation } from './email-validation'

describe('EmailValidation', () => {
  test('Should return error if emails is invalid', () => {
    const sut = new EmailValidation(faker.random.word())
    const falsyEmail = faker.random.words()
    const error = sut.validate(falsyEmail)
    expect(error).toEqual(new InvalidFieldError(falsyEmail))
  })

  test('Should return falsy if emails is valid', () => {
    const sut = new EmailValidation(faker.random.word())
    const error = sut.validate(faker.internet.email())
    expect(error).toBeFalsy()
  })
})
