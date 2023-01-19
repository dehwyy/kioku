"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const card_model_1 = require("./models/card.model");
const graphql_1 = require("@nestjs/graphql");
const card_service_1 = require("./card.service");
const createCardDTO_1 = require("./models/DTO/createCardDTO");
let CardResolver = class CardResolver {
    constructor(cardService) {
        this.cardService = cardService;
    }
    async getCard(id) {
        const card = await this.cardService.getCardById(id);
        return card;
    }
    async deleteCard(id) {
        const card = await this.cardService.deleteCardById(id);
        return card;
    }
    async createCard(userData) {
        const card = await this.cardService.createCard(userData);
        return card;
    }
};
__decorate([
    (0, graphql_1.Query)(returns => card_model_1.default, { name: 'card' }),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.ID })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CardResolver.prototype, "getCard", null);
__decorate([
    (0, graphql_1.Mutation)(returns => card_model_1.default, { name: 'deleteCard' }),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.ID })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CardResolver.prototype, "deleteCard", null);
__decorate([
    (0, graphql_1.Mutation)(returns => card_model_1.default, { name: 'createCard' }),
    __param(0, (0, graphql_1.Args)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createCardDTO_1.default]),
    __metadata("design:returntype", Promise)
], CardResolver.prototype, "createCard", null);
CardResolver = __decorate([
    (0, graphql_1.Resolver)(of => card_model_1.default),
    __metadata("design:paramtypes", [card_service_1.default])
], CardResolver);
exports.default = CardResolver;
