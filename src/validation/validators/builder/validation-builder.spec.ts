import faker from 'faker'
import { RequiredFieldValidation, EmailValidation, MinLengthValidation } from '@/validation/validators'
import { ValidationBuilder as sut } from './validation-builder'
import { CompareFieldsValidation } from '../compare-fields/compare-fields-validation'

describe('ValidationBuilder', () => {
  test('Should return RequiredFieldValidation', () => {
    const field = faker.database.column()
    const validation = sut.field(field).required().build()
    expect(validation).toEqual([new RequiredFieldValidation(field)])
  })

  test('Should return EmailValidation', () => {
    const field = faker.database.column()
    const validation = sut.field(field).email().build()
    expect(validation).toEqual([new EmailValidation(field)])
  })

  test('Should return MinLengthValidation', () => {
    const field = faker.database.column()
    const length = faker.datatype.number()
    const validation = sut.field(field).min(length).build()
    expect(validation).toEqual([new MinLengthValidation(field, length)])
  })

  test('Should return CompareFieldsValidation', () => {
    const field = faker.database.column()
    const fieldToCompare = faker.database.column()
    const validation = sut.field(field).sameAs(fieldToCompare).build()
    expect(validation).toEqual([new CompareFieldsValidation(field, fieldToCompare)])
  })

  test('Should return a list of validations', () => {
    const field = faker.database.column()
    const length = faker.datatype.number()
    const validation = sut.field(field).required().min(length).email().build()
    expect(validation).toEqual([
      new RequiredFieldValidation(field),
      new MinLengthValidation(field, length),
      new EmailValidation(field)
    ])
  })
})
