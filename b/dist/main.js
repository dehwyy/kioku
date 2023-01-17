"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const main_module_1 = require("./main.module");
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT || 2726;
const start = async () => {
    try {
        const app = await core_1.NestFactory.create(main_module_1.MainModule);
        await app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
    }
    catch (e) {
    }
};
start();
