describe("navbar", () => {
  beforeEach(() => {
    cy.visit("/")
  })
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

describe("login", () => {
  beforeEach(() => {
    cy.visit("/login")
  })
})



export {}