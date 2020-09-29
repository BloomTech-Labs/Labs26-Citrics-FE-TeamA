/// <reference types="cypress" />

context('changes to about us page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
  });

  it('has the "About Us" text', () => {
    cy.contains('About Us');
  });
  it('travels to the about us page', () => {
    cy.contains('About Us').click();
    cy.url().should('eq', 'http://localhost:3000/about-us');
  });
  it('About us page has "Meet the Team" text', () => {
    cy.contains('About Us').click();
    cy.contains('Meet the Team');
  });
});
context('About us page has team', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/about-us');
  });
  it('About us page has "Management" heading', () => {
    cy.contains('Management');
  });
  it('About us page has "Front-end Development" heading', () => {
    cy.contains('Front-end Development');
  });
  it('About us page has "Data Science" heading', () => {
    cy.contains('Data Science');
  });
});
