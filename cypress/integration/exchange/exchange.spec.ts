/// <reference types="cypress" />

describe('The Exchnage Page', () => {
  it('successfully loads', () => {
    cy.visit('/exchange');

    cy.contains('투자 가능한 빌딩');
    cy.contains('배당');
    cy.contains('건물 정보');
    cy.contains('토지 정보');
  });

  it('DABS 정렬 로직에 따라 가장 우선순위가 높은 DABS 거래 페이지로 이동해야한다.', () => {
    cy.visit('/exchange');

    cy.url().should('match', /\/exchange\?code=([A-Z]|[0-9]){1,}/);
  });
});
