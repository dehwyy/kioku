class Randomizer {
  private index = 0
  private orderedArray = [] as string[]
  constructor(private array: string[]) {}

  private makeRandomOrder() {
    for (const card of this.array) {
      const randomNumber = Math.random()
      if (randomNumber > 0.5) {
        this.orderedArray.unshift(card)
      } else {
        this.orderedArray.push(card)
      }
    }
  }
  private *getElement() {
    const element = this.orderedArray[this.index]
    this.index++
    yield element
  }
  private getNextElement() {
    return this.getElement().next().value
  }
  public getInfinityNextElement() {
    const element = this.getNextElement()
    if (element) return element
    this.index = 0
    this.orderedArray = []
    this.makeRandomOrder()
    return this.getNextElement()
  }
}

export default Randomizer
