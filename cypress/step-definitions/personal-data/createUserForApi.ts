import { When, Then } from '@badeball/cypress-cucumber-preprocessor';

let response: Cypress.Response<any>;

When('envío el formulario de cliente', function () {
  cy.get('@sessionCookie').then((sessionCookie) => {
    const cookieValue = sessionCookie as unknown as string;
    cy.submitClienteForm(cookieValue).then((res) => {
      response = res;
      cy.log(`Respuesta del servidor: ${JSON.stringify(res)}`);
    });
  });
});


Then('la respuesta del servidor debe ser exitosa', () => {
  expect(response.status).to.eq(200);
});
