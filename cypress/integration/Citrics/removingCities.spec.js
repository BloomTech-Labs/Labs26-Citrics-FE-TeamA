/// <reference types="cypress" />

context('Remove button does indeed remove selected city', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
  });

  // ONE CITY HERE

  it('Selects and views Tulsa, OK, then removing it to show the home page', () => {
    // await for the search bar info to load
    cy.wait(3500); // type 'Tulsa, OK' into the search bar
    cy.get('.ant-input')
      .type('Tulsa, OK')
      .should('have.value', 'Tulsa, OK');
    // select on Tulsa from the dropdown
    cy.contains('Tulsa, OK').click(); // wait for DS API data
    cy.wait(2000); // make sure 'Tulsa, OK' and the weather card show up
    cy.contains('Tulsa, OK'); // Make sure Tulsa, OK is in the document, as well as the weather
    cy.contains('Weather');
    cy.get('#btn1').click(); // Click on the remove button
    //expect home page text to show
    cy.contains('Data that Matters');
    cy.contains('Visualize Comparisons');
    cy.contains('Look Ahead');
  });

  // TWO CITIES HERE

  it('Selects and views two cities, then removes the first city', () => {
    cy.wait(3500); // await for the search bar info to load
    // type 'Tulsa, OK' into the search bar
    cy.get('.ant-input')
      .type('Tulsa, OK')
      .should('have.value', 'Tulsa, OK');
    // select on Tulsa from the dropdown
    cy.contains('Tulsa, OK').click(); // wait for DS API data
    cy.wait(2000); // make sure 'Tulsa, OK' and the weather card show up
    cy.contains('Tulsa, OK');
    cy.get('.ant-input').click(); // click on the search bar
    cy.wait(2500); // type in Seattle, WA
    cy.get('.ant-input')
      .type('Seattle, WA')
      .should('have.value', 'Seattle, WA'); // Click on Seattle from the dropdown from the search.
    cy.contains('Seattle, WA').click(); // Wait for data to retrieve from DS API
    cy.wait(3000); // Seattle, WA should be in the document.
    cy.contains('Tulsa, OK');
    cy.contains('Seattle, WA');
    cy.get('#btn1').click(); // Click on the remove button
    // Should have Seattle, WA but not Tulsa, OK
    cy.contains('Seattle, WA');
  });

  it('Selects and views two cities, then removes the second city', () => {
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
    cy.contains('Tulsa, OK');
    cy.contains('Seattle, WA');
    cy.get('#btn2').click(); // Click on the remove button
    // Should have Seattle, WA but not Tulsa, OK
    cy.contains('Tulsa, OK');
  });

  function threeCityAdd() {
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
  }
  // THREE CITIES HERE
  it('Selects and views three cities, removes first city leaving last two', () => {
    threeCityAdd();
    cy.wait(3000);
    cy.get('#btn1').click(); // Click on the remove button
    cy.wait(1000);

    // Should have Seattle, WA and LA, CA but not Tulsa, OK
    cy.contains('Seattle, WA');
    cy.contains('Los Angeles, CA');
  });
  it('Selects and views three cities, removes second city leaving first and last cities', () => {
    threeCityAdd();
    cy.wait(3000);

    cy.get('#btn2').click(); // Click on the remove button
    cy.wait(1000);

    // Should have Seattle, WA and LA, CA but not Tulsa, OK
    cy.contains('Tulsa, OK');
    cy.contains('Los Angeles, CA');
  });
  it('Selects and views three cities, removes third city leaving first two cities', () => {
    threeCityAdd();
    cy.wait(3500);
    cy.get('#btn3').click(); // Click on the remove button
    cy.wait(1000);
    // Should have Seattle, WA and LA, CA but not Tulsa, OK
    cy.contains('Tulsa, OK');
    cy.contains('Seattle, WA');
  });
});
