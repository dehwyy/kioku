"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const card_resolver_1 = require("./card.resolver");
const mongoose_1 = require("@nestjs/mongoose");
const card_schema_1 = require("./models/card.schema");
const card_service_1 = require("./card.service");
let CardModule = class CardModule {
};
CardModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: card_schema_1.default.name, schema: card_schema_1.CardSchema }]),
        ],
        providers: [card_resolver_1.default, card_service_1.default],
    })
], CardModule);
exports.default = CardModule;
