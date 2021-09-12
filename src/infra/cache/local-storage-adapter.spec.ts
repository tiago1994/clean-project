import { LocalStorageAdapter } from './local-storage-adapter'
import 'jest-localstorage-mock'
import faker from 'faker'

const makeSut = (): LocalStorageAdapter => new LocalStorageAdapter()

describe('LocalStorageAdapter', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  test('Should call localStorage with called values', () => {
    const sut = makeSut()
    const key = faker.database.column()
    const value = faker.datatype.uuid()
    sut.set(key, value)
    expect(localStorage.setItem).toHaveBeenCalledWith(key, value)
  })
})
