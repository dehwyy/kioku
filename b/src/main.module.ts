import {Module} from "@nestjs/common";
import {MongooseModule} from "@nestjs/mongoose";
import * as dotenv from "dotenv";

dotenv.config()
const DATABASE = process.env.DATABASE
@Module({
    imports: [
        MongooseModule.forRoot(DATABASE)
    ]
})
export class MainModule {

}