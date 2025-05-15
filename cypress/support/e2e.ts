/* eslint-disable */

// Import commands.js using ES2015 syntax:
import "../support/commands";
import "@shelex/cypress-allure-plugin";
import "allure-cypress";
import "cypress-real-events/support";

Cypress.on("uncaught:exception", (_err, _runnable) => {
  // returning false here prevents Cypress from failing the test
  return false;
});

Cypress.on("uncaught:exception", (err) => {
  if (err.message.includes("Access is denied for this document")) {
    // Ignorar este error en particular
    return false;
  }
});
Cypress.on('window:before:load', (win) => {
  // Sobrescribimos alert globalmente
  cy.stub(win, 'alert').callsFake((msg) => {
    Cypress.env('lastAlert', msg);
    console.log("✅ Stub de alert registrado en window:before:load");
    console.log("🚨 Alert capturado:", msg);
  }).as('iframeAlert');
});

beforeEach(() => {
  cy.allure().label("parentSuite", "Suite de Pruebas Detacoop");
  cy.allure().label("suite", "Automatización QA");
  cy.allure().label("feature", "E2E Principal");
});
