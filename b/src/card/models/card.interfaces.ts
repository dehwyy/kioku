export interface ICardResponse {
  face: string
  backface: string
}

export interface ICardUpdateRequest extends ICardResponse {
  id: string
}
