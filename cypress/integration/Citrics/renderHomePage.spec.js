/// <reference types="cypress" />

context('rendersHomePage', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
  });

  it('has the subtitle text', () => {
    cy.contains('Make the right choice for your new home');
  });
  it('has the column information listed upon render', () => {
    cy.contains('Data that Matters');
    cy.contains('Visualize Comparisons');
    cy.contains('Look Ahead');
  });
});
