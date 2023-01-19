export default class CardResolver {
    getCards(cardId: number): Promise<{
        name: string;
        cardId: number;
    }>;
}
