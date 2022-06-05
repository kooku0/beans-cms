/// <reference types="cypress" />

describe('The Sign In Page', () => {
  it('successfully loads', () => {
    cy.visit('/sign-in');

    cy.contains('로그인');
  });
});
