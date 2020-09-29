/// <reference types="cypress" />

context('Removes cities from comparison list', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
  });

  //    1 city removal
  it('Selects and views a city, then removes it.', () => {
    cy.wait(2000);
    cy.get('.ant-input').click();
    cy.get('.ant-input')
      .type('Tulsa, OK')
      .should('have.value', 'Tulsa, OK');
    cy.contains('Tulsa, OK').click();
    cy.contains('Tulsa, OK');
    cy.contains('Weather');
  });

  //    2 city removal
  it('Selects and views two cities, removes first city', () => {
    cy.wait(2000);
    cy.get('.ant-input')
      .click()
      .type('Tulsa, OK')
      .should('have.value', 'Tulsa, OK');
    cy.contains('Tulsa, OK').click();
    cy.contains('Tulsa, OK');
    cy.wait(3500);

    cy.get('.ant-input')
      .click()
      .type('Seattle, WA')
      .should('have.value', 'Seattle, WA');
    cy.contains('Seattle, WA').click();
    cy.contains('Tulsa, OK');
    cy.contains('Seattle, WA');
    cy.wait(3500);
  });

  it('Selects and views two cities, removes second city', () => {
    cy.wait(2000);
    cy.get('.ant-input')
      .click()
      .type('Tulsa, OK')
      .should('have.value', 'Tulsa, OK');
    cy.contains('Tulsa, OK').click();
    cy.contains('Tulsa, OK');
    cy.wait(3500);

    cy.get('.ant-input')
      .click()
      .type('Seattle, WA')
      .should('have.value', 'Seattle, WA');
    cy.contains('Seattle, WA').click();
    cy.contains('Tulsa, OK');
    cy.contains('Seattle, WA');
    cy.wait(3500);
  });

  //    3 city removal

  it('Selects and views three cities, removes first city', () => {
    cy.wait(2000);
    cy.get('.ant-input')
      .click()
      .type('Tulsa, OK')
      .should('have.value', 'Tulsa, OK');
    cy.contains('Tulsa, OK').click();
    cy.contains('Tulsa, OK');
    cy.wait(3500);

    cy.get('.ant-input')
      .click()
      .type('Seattle, WA')
      .should('have.value', 'Seattle, WA');
    cy.contains('Seattle, WA').click();
    cy.contains('Tulsa, OK');
    cy.contains('Seattle, WA');
    cy.wait(3500);

    cy.get('.ant-input')
      .click()
      .type('Los Angeles')
      .should('have.value', 'Los Angeles');
    cy.contains('Los Angeles').click();
    cy.wait(3000);
    cy.contains('Tulsa, OK');
    cy.contains('Seattle, WA');
    cy.contains('Los Angeles, CA');
  });

  it('Selects and views three cities, removes second city', () => {
    cy.wait(2000);
    cy.get('.ant-input')
      .click()
      .type('Tulsa, OK')
      .should('have.value', 'Tulsa, OK');
    cy.contains('Tulsa, OK').click();
    cy.contains('Tulsa, OK');
    cy.wait(3500);

    cy.get('.ant-input')
      .click()
      .type('Seattle, WA')
      .should('have.value', 'Seattle, WA');
    cy.contains('Seattle, WA').click();
    cy.contains('Tulsa, OK');
    cy.contains('Seattle, WA');
    cy.wait(3500);

    cy.get('.ant-input')
      .click()
      .type('Los Angeles')
      .should('have.value', 'Los Angeles');
    cy.contains('Los Angeles').click();
    cy.wait(3000);
    cy.contains('Tulsa, OK');
    cy.contains('Seattle, WA');
    cy.contains('Los Angeles, CA');
  });

  it('Selects and views three cities, removes third city', () => {
    cy.wait(2000);
    cy.get('.ant-input')
      .click()
      .type('Tulsa, OK')
      .should('have.value', 'Tulsa, OK');
    cy.contains('Tulsa, OK').click();
    cy.contains('Tulsa, OK');
    cy.wait(3500);

    cy.get('.ant-input')
      .click()
      .type('Seattle, WA')
      .should('have.value', 'Seattle, WA');
    cy.contains('Seattle, WA').click();
    cy.contains('Tulsa, OK');
    cy.contains('Seattle, WA');
    cy.wait(3500);

    cy.get('.ant-input')
      .click()
      .type('Los Angeles')
      .should('have.value', 'Los Angeles');
    cy.contains('Los Angeles').click();
    cy.wait(3000);
    cy.contains('Tulsa, OK');
    cy.contains('Seattle, WA');
    cy.contains('Los Angeles, CA');
  });
});
