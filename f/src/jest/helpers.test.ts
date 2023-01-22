// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import { expect } from "@jest/globals"
import Randomizer from "../tools/Randomizer"
describe("spec", () => {
  test("randomizer tests", () => {
    const random = new Randomizer(["10", "21", "31", "41", "51"])
    console.log(random.getInfinityNextElement())
    console.log(random.getInfinityNextElement())
    console.log(random.getInfinityNextElement())
    console.log(random.getInfinityNextElement())
    console.log(random.getInfinityNextElement())
    console.log(random.getInfinityNextElement())
    console.log(random.getInfinityNextElement())
    console.log(random.getInfinityNextElement())
  })
})

export {}
