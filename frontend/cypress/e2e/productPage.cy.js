/// <reference types="cypress" />

describe("Add Product Test", () => {
  it("should add a new product", () => {
    cy.intercept("GET", "/api/products", { fixture: "products/empty.json" }).as(
      "getProductsEmpty"
    );

    cy.intercept("POST", "/api/products", {
      fixture: "products/newProduct.json",
    }).as("postNewProduct");

    cy.visit("http://localhost:3000/");

    cy.wait("@getProductsEmpty");

    cy.get('[data-testid="add-product-form-title"]').contains(
      "Add a new product"
    );

    cy.get('[data-testid="product-list-not-found"]').contains(
      "No products found ..."
    );

    cy.get('[data-testid="input-form"]')
      .type("NEW PRODUCT")
      .should("have.value", "NEW PRODUCT");

    cy.intercept("GET", "/api/products", {
      fixture: "products/singleProduct.json",
    }).as("getNewProduct");

    cy.get('[data-testid="button-element"]').click();

    cy.wait(["@postNewProduct", "@getNewProduct"]);

    cy.get('[data-testid="product-name"]').contains("A NEW PRODUCT");
  });
});
