/// <reference types="cypress" />

describe('The Home Page', () => {
  it('successfully loads', () => {
    cy.visit('/');

    cy.contains('투자 가능한 빌딩');
  });
});
