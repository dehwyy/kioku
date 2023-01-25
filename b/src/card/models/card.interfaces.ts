export interface ICardRequest {
  face: string
  backface: string
}

export interface ICardQL extends ICardRequest {
  _id: string
}

export interface ICardUpdateRequest extends ICardRequest {
  id: string
}
