/// <reference types="cypress" />
context('search bar and texts appears', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
  });

  it("contains the 'Search City' text", () => {
    cy.contains('Search City:');
  });
  it("Contains the 'Advanced Search' text", () => {
    cy.contains('Advanced Search');
  });
});
context('Search bar is able to find cities', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
  });
  it('types in a city into the search bar input', () => {
    cy.get('.ant-input')
      .type('Tulsa, OK')
      .should('have.value', 'Tulsa, OK');
    cy.contains('Tulsa, OK');
  });
  it('Multiple cities appear on search', () => {
    cy.get('.ant-input').type('san');
    cy.contains('San Antonio, TX');
    cy.contains('San Francisco, CA');
    cy.contains('San Mateo, CA');
    cy.contains('San Ramon, CA');
    cy.contains('Santa Cruz, CA');
  });
});
