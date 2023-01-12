import {NestFactory} from "@nestjs/core";
import {MainModule} from "./main.module";
import * as dotenv from "dotenv"

dotenv.config()
const PORT = process.env.PORT || 2726

const start = async () => {
    try {
        const app = await NestFactory.create(MainModule)
        await app.listen(PORT, () => console.log(`http://localhost:${PORT}`))
    } catch (e) {

    }
}

start()