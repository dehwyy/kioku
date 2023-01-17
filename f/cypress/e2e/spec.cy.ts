describe("navigation", () => {
  beforeEach(() => {
    cy.visit("/")
  })
  context.skip("navigation between pages", () => {
    it("profile navigation", () => {
      cy.get('[data-cy=profilePage]').click().get('[data-cy="profileTabs"]').should("exist")
    })
    it("cards navigation", () => {
      cy.get('[data-cy="cardsPage"]').click().get('[data-cy="cardsCardsList"]').should("exist")
    })
    it("collections navigation", async () => {
      cy.get('[data-cy=collectionsPage]').click().get('[data-cy="collectionsWrapper"]').should("exist")
    })
  })
  context("other buttons navigation", () => {
    it.skip("navigate from index to login via sign up button", () => {
      const button = cy.scrollTo(0, 300).get("button").contains(/sign up/i)
      button.click()
    })
  })
})

describe("singlePage test", () => {
  context.skip("LoginPage", () => {
    beforeEach(() => {
      cy.visit("/login")
      cy.get("input").should("have.length", 2)
      cy.get("[data-cy=firstInput]").as("fInput")
      cy.get("[data-cy=secondInput]").as("sInput")
    })
    it("simple test", () => {
      cy.get("@fInput").type("login")
      cy.get("@sInput").type("password")
      cy.contains(/submit/i).click()
      cy.get("[data-cy=loader]")
      cy.url().should("match", /user\/\d/)
    })
    it("wrong test by email", () => {
      cy.get("@fInput").type("wrong login")
      const url = cy.url()
      cy.get("[data-cy=errorMessage]").should("exist")
      expect(url).to.equal(cy.url())
    })
  })
  context.skip("IndexPage", () => {
    beforeEach(() => {
      cy.visit("/")
    })
    it("image", () => {
      cy.get("[data-cy=previewImage]").should("exist").invoke('attr', "width").should("equal", "400")
    })
  })
  context("userPage", () => {
    beforeEach(() => {
      cy.visit("/user/1")
    })
    it("section switch test", () => {
      cy.get("[data-cy=cards]").click().get("button").contains(/learn/i).should("exist")
      cy.get("[data-cy=collections]").click().get("button").contains(/more/i).should("exist")
    })
  })
})




export {}