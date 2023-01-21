import { NestFactory } from '@nestjs/core'
import { MainModule } from './main.module'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import * as dotenv from 'dotenv'
import { NestExpressApplication } from '@nestjs/platform-express'
import { ValidationPipe } from '@nestjs/common'

dotenv.config()
const PORT = process.env.PORT || 2726
// const swaggerConfig = new DocumentBuilder()
//   .setTitle('NestJS App')
//   .setDescription('description')
//   .setVersion('1.0')
//   .build()

const start = async () => {
  try {
    const app = await NestFactory.create<NestExpressApplication>(MainModule)
    // const doc = SwaggerModule.createDocument(app, swaggerConfig)
    // SwaggerModule.setup('/docs', app, doc)
    app.useGlobalPipes(new ValidationPipe())
    await app.listen(PORT, () =>
      console.log(`http://localhost:${PORT}/graphql`),
    )
  } catch (e) {
    console.log(e)
  }
}

start().then(() => console.log(PORT))
