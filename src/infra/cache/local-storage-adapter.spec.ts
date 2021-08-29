import { LocalStorageAdapter } from './local-storage-adapter'
import 'jest-localstorage-mock'
import faker from 'faker'

describe('LocalStorageAdapter', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  test('Should call localStorage with called values', async () => {
    const sut = new LocalStorageAdapter()
    const key = faker.database.column()
    const value = faker.datatype.uuid()
    await sut.set(key, value)
    expect(localStorage.setItem).toHaveBeenCalledWith(key, value)
  })
})
