context('Search bar is able to find cities', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
  });

  it('Selects and views Tulsa, OK', () => {
    cy.wait(2000);
    cy.get('.ant-input').click();
    cy.get('.ant-input')
      .type('Tulsa, OK')
      .should('have.value', 'Tulsa, OK');
    cy.contains('Tulsa, OK').click();
    cy.contains('Tulsa, OK');
    cy.contains('Weather');
  });

  it('Selects and views two cities', () => {
    cy.wait(2000);
    cy.get('.ant-input')
      .click()
      .type('Tulsa, OK')
      .should('have.value', 'Tulsa, OK');
    cy.contains('Tulsa, OK').click();
    cy.contains('Tulsa, OK');
    cy.get('.ant-input')
      .click()
      .type('Seattle, WA')
      .should('have.value', 'Seattle, WA');
    cy.contains('Seattle, WA').click();
    cy.wait(3000);
    cy.contains('Seattle, WA');
  });

  it('Selects and views three cities', () => {
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
