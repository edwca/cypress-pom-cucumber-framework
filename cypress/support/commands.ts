///// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

/// <reference types="cypress" />

Cypress.Commands.add(
  "getIframeGeneralInformation",
  (iframeSelector: string): Cypress.Chainable<JQuery<HTMLElement>> => {
    return cy
      .get(iframeSelector, { timeout: 10000 })
      .should("exist")
      .then(($iframe) => {
        return new Cypress.Promise((resolve) => {
          const iframeEl = $iframe[0] as HTMLIFrameElement;
          const tryGetBody = () => {
            const doc = iframeEl.contentDocument;
            const body = doc?.body;
            if (body && body.children.length > 0) {
              resolve(cy.wrap(body));
            } else {
              setTimeout(tryGetBody, 100);
            }
          };
          tryGetBody();
        });
      }) as Cypress.Chainable<JQuery<HTMLElement>>;
  }
);
