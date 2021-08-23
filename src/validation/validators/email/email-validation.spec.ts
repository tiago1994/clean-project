import faker from 'faker'
import { InvalidFieldError } from '@/validation/errors'
import { EmailValidation } from './email-validation'

const makeSut = (): EmailValidation => new EmailValidation(faker.database.column())

describe('EmailValidation', () => {
  test('Should return error if emails is invalid', () => {
    const sut = makeSut()
    const falsyEmail = faker.random.words()
    const error = sut.validate(falsyEmail)
    expect(error).toEqual(new InvalidFieldError(falsyEmail))
  })

  test('Should return falsy if emails is valid', () => {
    const sut = makeSut()
    const error = sut.validate(faker.internet.email())
    expect(error).toBeFalsy()
  })
})
