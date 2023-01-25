import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import { MainModule } from '@src/main.module'
import { createCard, deleteUserTest, registerUserTest } from "./utils"


describe.only('card e2e', () => {
  let app: INestApplication
  let id: string
  let jwtToken: string
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [MainModule],
    }).compile()
    app = moduleFixture.createNestApplication()
    await app.init()
  })

  it('register user', async () => {
    const {data} = await registerUserTest({app})
    const {token, user} = data.register
    id = user._id
    jwtToken = token
    expect(token).toBeDefined()
    expect(user._id).toBeDefined()
    expect(user.password).toBeDefined()
    expect(user.email).toBeDefined()
  })

  it('delete user', async () => {
    const res = await deleteUserTest({app, token: jwtToken, id})
    const {data} = res
    expect(data.deleteUser._id).toBeDefined()
    expect(data.deleteUser.password).toBeDefined()
    expect(data.deleteUser.email).toBeDefined()
  })

})
