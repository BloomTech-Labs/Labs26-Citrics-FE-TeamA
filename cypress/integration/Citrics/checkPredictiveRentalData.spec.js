/// <reference types="cypress" />

context('Search bar is able to find cities', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
  });
  // ONE CITY HERE

  it('Selects one cities to have 1 rentalFill section', () => {
    // await for the search bar info to load
    cy.wait(3500); // type 'Tulsa, OK' into the search bar
    cy.get('.ant-input')
      .type('Tulsa, OK')
      .should('have.value', 'Tulsa, OK');
    // select on Tulsa from the dropdown
    cy.contains('Tulsa, OK').click(); // wait for DS API data
    cy.wait(2000);
    cy.get('section.rentalFill').should($section => {
      expect($section).to.have.length(1); // Confirms only 1 rentalFill section appears
    });
  });

  // TWO CITIES HERE

  it('Selects two cities to have 2 rentalFill sections', () => {
    cy.wait(3500); // await for the search bar info to load
    // type 'Tulsa, OK' into the search bar
    cy.get('.ant-input')
      .type('Tulsa, OK')
      .should('have.value', 'Tulsa, OK');
    // select on Tulsa from the dropdown
    cy.contains('Tulsa, OK').click(); // wait for DS API data
    cy.wait(2000);
    cy.get('.ant-input').click();
    cy.wait(2500); // type in Seattle, WA
    cy.get('.ant-input')
      .type('Seattle, WA')
      .should('have.value', 'Seattle, WA'); // Click on Seattle from the dropdown from the search.
    cy.contains('Seattle, WA').click(); // Wait for data to retrieve from DS API
    cy.wait(3000);
    cy.get('section.rentalFill').should($section => {
      expect($section).to.have.length(2); // Confirms only 2 rentalFill section appears
    });
  });

  //   // THREE CITIES HERE
  it('Selects three cities to have 3 rentalFill sections', () => {
    cy.wait(3500); // await for the search bar info to load
    // type 'Tulsa, OK' into the search bar
    cy.get('.ant-input')
      .type('Tulsa, OK')
      .should('have.value', 'Tulsa, OK');
    // select on Tulsa from the dropdown
    cy.contains('Tulsa, OK').click(); // wait for DS API data
    cy.wait(2000);
    cy.get('.ant-input').click();
    cy.wait(2500); // type in Seattle, WA
    cy.get('.ant-input')
      .type('Seattle, WA')
      .should('have.value', 'Seattle, WA'); // Click on Seattle from the dropdown from the search.
    cy.contains('Seattle, WA').click(); // Wait for data to retrieve from DS API
    cy.wait(3000);
    cy.get('.ant-input').click(); // click on the search bar
    cy.get('.ant-input')
      .type('Los Angeles') // Type in 'Los Angeles'
      .should('have.value', 'Los Angeles'); // Click on 'Los Angeles from the dropdown on the search bar results
    cy.contains('Los Angeles').click();
    cy.wait(3500); // wait for data to render, all three cities added should display
    cy.get('section.rentalFill').should($section => {
      expect($section).to.have.length(3); // Confirms only 3 rentalFill section appears
    });
  });
});
