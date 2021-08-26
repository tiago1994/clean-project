import faker from 'faker'
import { InvalidFieldError } from '@/validation/errors'
import { EmailValidation } from './email-validation'

const makeSut = (): EmailValidation => new EmailValidation('email')

describe('EmailValidation', () => {
  test('Should return error if emails is invalid', () => {
    const sut = makeSut()
    const falsyEmail = faker.random.words()
    const error = sut.validate(falsyEmail)
    expect(error).toEqual(new InvalidFieldError('email'))
  })

  test('Should return falsy if emails is valid', () => {
    const sut = makeSut()
    const error = sut.validate(faker.internet.email())
    expect(error).toBeFalsy()
  })

  test('Should return falsy if emails is empty', () => {
    const sut = makeSut()
    const error = sut.validate('')
    expect(error).toBeFalsy()
  })
})
