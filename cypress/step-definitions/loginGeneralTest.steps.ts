import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import { LoginPage } from '../pages/loginPage';

const loginPage = new LoginPage();

beforeEach(() => { 
cy.clearCookies()
cy.getCookies().should('be.empty')
cy.clearLocalStorage()
cy.getAllLocalStorage().should('be.empty')
})

Given('que ingreso al login', () => {
  loginPage.visit();
});

When('ingreso las credenciales correctamente', () => {
  loginPage.fillUsername(`${Cypress.env('username')}`);
  loginPage.fillPassword(`${Cypress.env('password')}`);
  loginPage.submit();
});

Then('navego al módulo Identificación General', () => {
  cy.get('#leftPanel').contains('Identificación General').click({ force: true });
});

Then('consulto por rut en el iframe', () => {

  cy.getIframeGeneralInformation('#ifr_contenido').then(($body: any) => {
    cy.wrap($body).find('#rut').should('be.visible').type(`${Cypress.env('rut')}`);
    cy.wrap($body).find('#btn_consultar').click();
  });
});

export {}; 