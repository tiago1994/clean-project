import faker from 'faker'
import { InvalidFieldError } from '@/validation/errors'
import { EmailValidation } from './email-validation'

const makeSut = (field: string): EmailValidation => new EmailValidation(field)

describe('EmailValidation', () => {
  test('Should return error if emails is invalid', () => {
    const field = faker.database.column()
    const sut = makeSut(field)
    const falsyEmail = faker.random.words()
    const error = sut.validate({ [field]: falsyEmail })
    expect(error).toEqual(new InvalidFieldError(field))
  })

  test('Should return falsy if emails is valid', () => {
    const field = faker.database.column()
    const sut = makeSut(field)
    const error = sut.validate({ [field]: faker.internet.email() })
    expect(error).toBeFalsy()
  })

  test('Should return falsy if emails is empty', () => {
    const field = faker.database.column()
    const sut = makeSut(field)
    const error = sut.validate({ [field]: '' })
    expect(error).toBeFalsy()
  })
})
