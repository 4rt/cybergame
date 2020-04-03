describe('Game starts', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Game screen is rendered', () => {
    cy.get('section#field');
    cy.get('section#field header');
    cy.get('div#grid');
  });

  it('Cells are automatically populated', () => {
    cy.get('section#field header').contains('Populate').click();
    cy.get('section#field').find('.cell.alive');
  });

  it('Cells are manually populated', () => {
    cy
      .get('section#field')
      .find('.rows:first-child .cell:first-child')
      .click();
    cy.get('section#field').find('.cell.alive').should('have.length', 1);
  });

  it('Cells are cleared', () => {
    cy.get('section#field header').contains('Populate').click();
    cy.get('section#field').find('.cell.alive');
    cy.get('section#field header').contains('Clear').click();
    cy.get('section#field').find('.cell.alive').should('have.length', 0);
  });
});
