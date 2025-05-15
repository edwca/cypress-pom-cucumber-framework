import { Given, When } from "@badeball/cypress-cucumber-preprocessor";
import { LoginPage } from "../../pages/login-page/loginPage";

const loginPage = new LoginPage();

beforeEach(() => {
  cy.clearCookies();
  cy.getCookies().should("be.empty");
  cy.clearLocalStorage();
  cy.getAllLocalStorage().should("be.empty");
  cy.screenshotStep("Inicio del test");
});

Given("que me dirijo al portal total core", () => {
  loginPage.visit();
  cy.screenshotStep("Inicio del test");
});

When("ingreso las credenciales validas", () => {
  loginPage.fillUsername(`${Cypress.env("username")}`);
  loginPage.fillPassword(`${Cypress.env("password")}`);
  loginPage.submit();

  cy.getCookie("ASP.NET_SessionId").then((cookie) => {
    const sessionCookie = cookie?.value;
    cy.wrap(cookie?.value).as("sessionCookie");
    cy.log(`Guardada en contexto: ${sessionCookie}`);
  });

  cy.screenshotStep("Inicio del test");
});
