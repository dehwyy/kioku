import { NestFactory } from '@nestjs/core'
import { MainModule } from './main.module'
import * as dotenv from 'dotenv'
import { NestExpressApplication } from '@nestjs/platform-express'

dotenv.config()
const PORT = process.env.PORT || 2726

const start = async () => {
  try {
    const app = await NestFactory.create<NestExpressApplication>(MainModule)
    await app.listen(PORT, () =>
      console.log(`http://localhost:${PORT}/graphql`),
    )
  } catch (e) {
    console.log(e)
  }
}

start().then(() => console.log(PORT))
