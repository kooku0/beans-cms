/// <reference types="cypress" />

describe('The Exchange Page', () => {
  it('회원가입 & 로그인하기 버튼이 보여야 한다.', () => {
    cy.visit('/exchange');

    cy.contains('회원가입');
    cy.contains('로그인하기');
  });

  it('"로그인하기" 버튼을 누르면 로그인페이지로 이동해야한다.', () => {
    cy.visit('/exchange');

    cy.contains('로그인하기').click();

    cy.url().should('include', '/sign-in');
  });
});
