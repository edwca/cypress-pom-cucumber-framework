// ***********************************************************
// This example support/e2e.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import '../support/commands'
// import 'allure-cypress/runtime';
import '@shelex/cypress-allure-plugin';
import "allure-cypress"; 
import "cypress-real-events/support";

Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test
  return false
})

beforeEach(() => {
  cy.allure().label('parentSuite', 'Suite de Pruebas Detacoop');
  cy.allure().label('suite', 'Automatización QA');
  cy.allure().label('feature', 'E2E Principal');
  });
  