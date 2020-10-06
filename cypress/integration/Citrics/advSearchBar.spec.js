/// <reference types="cypress" />

function runForm(){
    // open form
    cy.get('.ant-btn')
        .contains('Advanced Search')
        .click();

    // select pop input
    cy.get('#population')
    .select('399999');
    
    // confirm pop value is selected
    cy.get('#population').should('have.value', '399999');

    // select climate input
    cy.get('#climate')
    .select('hot');
    
    // confirm climate value is selected
    cy.get('#climate').should('have.value', 'hot');
    
    // select budget input
    cy.get('#budget')
    .type('1250');

    // confirm budget value is matching the typed value
    cy.get('#budget').should('have.value', 1250);

    // select homesize input
    cy.get('#homesize')
    .select('1br');
    
    // confirm homesize value is selected
    cy.get('#homesize').should('have.value', '1br');
}

context('Advanced Search Button', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/');
    });

    it("opens up advanced search form", () => {
        cy.get('.ant-btn')
        .contains('Advanced Search')
        .click();
    });

    it("fills in the inputs in form", () => {
        runForm();
    })

    it('clears form after canceling', () => {
        runForm();
        
        // click cancel to reset
        cy.get('.ant-btn')
        .contains('Cancel')
        .click();
        // re-open form
        cy.get('.ant-btn')
        .contains('Advanced Search')
        .click();

        // select budget input and check if empty string
        cy.get('#budget').should('have.value', '');
    });
});