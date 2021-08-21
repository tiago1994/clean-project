import React from 'react'
import Login from './login'
import { render, RenderResult, fireEvent, cleanup } from '@testing-library/react'
import { ValidationStub } from '@/presentation/test'
import faker from 'faker'

type SutTypes = {
  sut: RenderResult
  validationStub: ValidationStub
}

const makeSut = (): SutTypes => {
  const validationStub = new ValidationStub()
  validationStub.errorMessage = faker.random.words()
  const sut = render(<Login validation={validationStub} />)
  return {
    sut,
    validationStub
  }
}

describe('Login Component', () => {
  afterEach(cleanup)

  test('Should start with initial state', () => {
    const { sut, validationStub } = makeSut()
    const errorWrap = sut.getByTestId('error-wrap')
    expect(errorWrap.childElementCount).toBe(0)
    const submitButton = sut.getByTestId('submit') as HTMLButtonElement
    expect(submitButton.disabled).toBe(true)
    const emailStatus = sut.getByTestId('email-status')
    expect(emailStatus.title).toBe(validationStub.errorMessage)
    const passwordStatus = sut.getByTestId('password-status')
    expect(passwordStatus.title).toBe(validationStub.errorMessage)
  })

  test('Should show email error if validation fails', () => {
    const { sut, validationStub } = makeSut()
    const input = sut.getByTestId('email')
    fireEvent.input(input, { target: { value: faker.internet.email() } })
    const status = sut.getByTestId('email-status')
    expect(status.title).toBe(validationStub.errorMessage)
  })

  test('Should show password error if validation fails', () => {
    const { sut, validationStub } = makeSut()
    const input = sut.getByTestId('password')
    fireEvent.input(input, { target: { value: faker.internet.password() } })
    const status = sut.getByTestId('password-status')
    expect(status.title).toBe(validationStub.errorMessage)
  })

  test('Should show valid State email if Validation succeds', () => {
    const { sut, validationStub } = makeSut()
    validationStub.errorMessage = null
    const input = sut.getByTestId('email')
    fireEvent.input(input, { target: { value: faker.internet.email() } })
    const status = sut.getByTestId('email-status')
    expect(status.title).toBe('')
  })

  test('Should show valid State password if Validation succeds', () => {
    const { sut, validationStub } = makeSut()
    validationStub.errorMessage = null
    const input = sut.getByTestId('password')
    fireEvent.input(input, { target: { value: faker.internet.password() } })
    const status = sut.getByTestId('password-status')
    expect(status.title).toBe('')
  })
})
