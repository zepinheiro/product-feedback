/// <reference types="cypress" />
describe("Add Review Test", () => {
  it("", () => {
    cy.intercept("GET", "/api/products/product_id", {
      fixture: "product/product.json",
    }).as("getProduct");

    cy.intercept("GET", "/api/products/product_id/reviews", {
      fixture: "reviews/empty.json",
    }).as("getEmptyReviews");

    cy.visit("/product_id");

    cy.wait(["@getProduct", "@getEmptyReviews"]);

    cy.get('[data-testid="product-page-title"]').contains("PRODUCT NAME");
    cy.get(
      '[data-testid="product-reviews-component"] > :nth-child(2)'
    ).contains("No reviews found!");

    cy.get('[placeholder="Name"]')
      .type("review name")
      .should("have.value", "review name");

    cy.get('[placeholder="Email"]')
      .type("email@email.com")
      .should("have.value", "email@email.com");

    cy.get('[data-testid="star-rating-container"] > :nth-child(4)')
      .click()
      .should("have.attr", "color", "orange");

    cy.get('[data-testid="text-area-element"]')
      .type("review content")
      .should("have.value", "review content");

    cy.intercept("POST", "/api/products/product_id/review", {
      fixture: "reviews/postReview.json",
    }).as("postNewReview");

    cy.intercept("GET", "/api/products/product_id/reviews", {
      fixture: "reviews/review.json",
    }).as("getReviews");

    cy.get('[data-testid="button-element"]').click();

    cy.wait(["@postNewReview", "@getReviews"]);

    cy.get('[data-testid="product-review-container"]').should(
      "have.length",
      "1"
    );

    cy.get('[data-testid="product-review-name"]').contains("review name");
    cy.get('[data-testid="product-review-meta-email"]').contains(
      "email@email.com"
    );
    cy.get(
      '[data-testid="product-review-meta-container"] > [data-testid="star-rating-container"] > :nth-child(4)'
    ).should("have.attr", "color", "orange");
    cy.get(
      '[data-testid="product-review-meta-container"] > [data-testid="star-rating-container"] > :nth-child(5)'
    ).should("have.attr", "color", "lightgray");
    cy.get('[data-testid="product-review-content"]').contains("review content");
  });
});
