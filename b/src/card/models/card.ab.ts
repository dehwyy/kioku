export abstract class CardInputType {
  face: string
  backface: string
}

export abstract class CardOutputType extends CardInputType {
  _id: string
}
