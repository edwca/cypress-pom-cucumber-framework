import { Given, Then } from "@badeball/cypress-cucumber-preprocessor";

let resultadoDB: string[];

Given("me conecto a la base de datos", () => {
  cy.task("getCategoriasWeb").then((result) => {
    resultadoDB = result as string[];
    cy.log("Bases de datos:", JSON.stringify(resultadoDB));
  });
});

Then("visualizo las bases de datos disponibles", () => {
  cy.wrap(null).then(() => {
    cy.log("🧪 Bases de datos:", resultadoDB);
    expect(resultadoDB.length).to.be.greaterThan(0);
  });
});
