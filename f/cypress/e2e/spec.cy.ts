describe("navigation", () => {
  beforeEach(() => {
    cy.visit("/")
  })
  context("navigation via header", () => {
    it("profile navigation", () => {
      cy.get('[data-cy=profilePage]').click().get('[data-cy="profileTabs"]').should("exist")
    })
    it("card navigation", () => {
      cy.get('[data-cy="cardsPage"]').click().get('[data-cy="cardsCardsList"]').should("exist")
    })
    it("collections navigation", () => {
      cy.get('[data-cy=collectionsPage]').click().get('[data-cy="collectionsWrapper"]').should("exist")
    })
  })
  context("navigation via other buttons", () => {
    it("navigate from index to login via sign up button", () => {
      const button = cy.scrollTo(0, 300).get("button").contains(/sign up/i)
      button.click()
    })
    it("from popularCollections to quiz-card", () => {
      cy.get('[data-cy=collectionsPage]').click()
      cy.get("[data-cy=popularCollectionsButton]").last().click()
      cy.url().should("match", /\/cards\/\d/)
      cy.scrollTo("top", {ensureScrollable: false})
      cy.contains(/quiz-cards/i)
    })
    it("from quiz-card to card", () => {
      cy.get('[data-cy=cardsPage]').click()
      cy.get("[data-cy=quizCardButton]").last().click()
      cy.url().should("match", /\/cards\/\d\/\d/)
      cy.contains(/begin learning/i)
    })
    it("from quiz-card to card", () => {
      cy.get('[data-cy=cardsPage]').click()
      cy.get("[data-cy=quizCardButton]").last().click()
      cy.url().should("match", /\/cards\/\d\/\d/)
    })
    it("PROFILE/card => card", () => {
      cy.get("[data-cy=profilePage]").click()
      cy.get('[data-cy=card]').click()
      cy.get("[data-cy=quizCardButton]").last().click()
      cy.url().should("match", /\/cards\/\d\/\d/)
      cy.get("button").contains(/begin learning/i)
    })
    it("PROFILE/collections => quiz-card", () => {
      cy.get('[data-cy=profilePage]').click()
      cy.get('[data-cy=collections]').click()
      cy.get("[data-cy=popularCollectionsButton]").first().click()
      cy.url().should("match", /\/cards\/\d/)
      cy.scrollTo("top", {ensureScrollable: false})
      cy.contains(/quiz-cards/i)
    })
  })
})
describe("singlePage test", () => {
  context("LoginPage", () => {
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
    // it("wrong test by email", () => {
    //   cy.get("@fInput").type("wrong login")
    //   const url = cy.url()
    //   cy.get("[data-cy=errorMessage]").should("exist")
    //   expect(url).to.equal(cy.url())
    // })
  })
  context("IndexPage", () => {
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
      cy.get("[data-cy=card]").click().get("button").contains(/learn/i).should("exist")
      cy.get("[data-cy=collections]").click().get("button").contains(/more/i).should("exist")
    })
  })
})
describe("footer on every page", () => {
  afterEach(() => {
    const footer = cy.scrollTo('bottom', {ensureScrollable: false}).get("[data-cy=footer]")
    footer.children().should("have.length", 3)
    footer.get("[data-cy=footer] > span").should("have.length", 1).invoke("text").should("match", /creator/i)
    footer.get("[data-cy=footer] > svg").should("have.length", 1)
    footer.get("[data-cy=footer] > a").should("have.length", 1).invoke("attr", "href").should("match", /github/i)
    footer.get("[data-cy=footer] > a").invoke("text").should("match", /dehwyy/i)
  })
  it("index page", () => {
    cy.visit("/")
  })
  it("popularCollections page", () => {
    cy.visit("/popularCollections")
  })
  it("card page", () => {
    cy.visit("/card")
  })
  it("quiz-card page", () => {
    cy.visit("/card/1")
  })
  it("card page", () => {
    cy.visit("/card/1/1")
  })
  it("user page", () => {
    cy.visit("/user/1")
  })
  it("login page", () => {
    cy.visit("/login")
  })
})



export {}