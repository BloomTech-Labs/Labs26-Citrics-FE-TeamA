/// <reference types="cypress" />

context('changes to about us page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
  });

  it('Contains the Home link on the nav bar', () => {
    cy.contains('Home');
  });
  it('Contains the About Us link on the nav bar', () => {
    cy.contains('About Us');
  });
  it('Takes a user to the about us page and back over to the home page.', () => {
    cy.contains('About Us').click();
    cy.url().should('eq', 'http://localhost:3000/about-us');
    cy.contains('Home').click();
    cy.url().should('eq', 'http://localhost:3000/');
  });
});
