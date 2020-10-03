/// <reference types="cypress" />

context('Search bar is able to find cities', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
  });
  // ONE CITY HERE

  it('Selects and views Tulsa, OK', () => {
    // await for the search bar info to load
    cy.wait(3500); // type 'Tulsa, OK' into the search bar
    cy.get('.ant-input')
      .type('Tulsa, OK')
      .should('have.value', 'Tulsa, OK');
    // select on Tulsa from the dropdown
    cy.contains('Tulsa, OK').click(); // wait for DS API data
    cy.wait(2000); // make sure 'Tulsa, OK' and the weather card show up
    cy.contains('Tulsa, OK');
    cy.contains('Weather');
  });
  // TWO CITIES HERE

  it('Selects and views two cities', () => {
    cy.wait(3500); // await for the search bar info to load
    // type 'Tulsa, OK' into the search bar
    cy.get('.ant-input')
      .type('Tulsa, OK')
      .should('have.value', 'Tulsa, OK');
    // select on Tulsa from the dropdown
    cy.contains('Tulsa, OK').click(); // wait for DS API data
    cy.wait(2000); // make sure 'Tulsa, OK' and the weather card show up
    cy.contains('Tulsa, OK'); // click on the search bar
    cy.get('.ant-input').click();
    cy.wait(2500); // type in Seattle, WA
    cy.get('.ant-input')
      .type('Seattle, WA')
      .should('have.value', 'Seattle, WA'); // Click on Seattle from the dropdown from the search.
    cy.contains('Seattle, WA').click(); // Wait for data to retrieve from DS API
    cy.wait(3000); // Seattle, WA should be in the document.
    cy.contains('Seattle, WA');
  });

  // THREE CITIES HERE
  it('Selects and views three cities', () => {
    cy.wait(3500); // await for the search bar info to load
    // type 'Tulsa, OK' into the search bar
    cy.get('.ant-input')
      .type('Tulsa, OK')
      .should('have.value', 'Tulsa, OK');
    // select on Tulsa from the dropdown
    cy.contains('Tulsa, OK').click(); // wait for DS API data
    cy.wait(2000); // make sure 'Tulsa, OK' and the weather card show up
    cy.contains('Tulsa, OK'); // click on the search bar
    cy.get('.ant-input').click();
    cy.wait(2500); // type in Seattle, WA
    cy.get('.ant-input')
      .type('Seattle, WA')
      .should('have.value', 'Seattle, WA'); // Click on Seattle from the dropdown from the search.
    cy.contains('Seattle, WA').click(); // Wait for data to retrieve from DS API
    cy.wait(3000); // Seattle, WA & Tulsa, OK should be in the document.
    cy.contains('Tulsa, OK');
    cy.contains('Seattle, WA'); // click on the search bar
    cy.get('.ant-input').click(); // Type in 'Los Angeles'
    cy.get('.ant-input')
      .type('Los Angeles')
      .should('have.value', 'Los Angeles'); // Click on 'Los Angeles from the dropdown on the search bar results
    cy.contains('Los Angeles').click();
    cy.wait(3000); // wait for data to render, all three cities added should display
    cy.contains('Tulsa, OK');
    cy.contains('Seattle, WA');
    cy.contains('Los Angeles, CA');
  });
});
