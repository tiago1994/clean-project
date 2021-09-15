import { Authentication } from '@/domain/usecases/authentication'
import faker from 'faker'

export const mockAuthentication = (): Authentication.Params => ({
  email: faker.internet.email(),
  password: faker.internet.password()
})

export const mockAccountModel = (): Authentication.Model => ({
  accessToken: faker.datatype.uuid(),
  name: faker.name.findName()
})
