/// <reference types="cypress" />

Cypress.on('uncaught:exception', (err) => !err.message.includes('ResizeObserver'));
