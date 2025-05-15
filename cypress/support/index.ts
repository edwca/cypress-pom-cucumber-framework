/* eslint-disable no-unused-vars */


/// <reference types="cypress" />
/// <reference types="allure-cypress" />

declare global {
    namespace Cypress {
      interface Chainable {
        /**
         * Obtiene el body de un iframe de forma segura
         * @param iframeSelector selector del iframe
         */
        getIframeGeneralInformation(iframeSelector: string): Chainable<JQuery<HTMLElement>>;
      }
    }
  }

  declare global {
    namespace Cypress {
      interface Chainable {
        /**
         * Obtiene el body de un iframe de forma segura
         * @param screen Screen de la prueba
         */
        screenshotStep(screem: string): Chainable<JQuery<HTMLElement>>;
      }
    }
  }

  declare global {
    namespace Cypress {
      interface Chainable {
        /**
         * Obtiene el body de un iframe de forma segura
         * @param screen Screen de la prueba
         */
        getNestedIframeBody(outerIframeSelector: string, innerIframeSelector:string): Chainable<JQuery<HTMLElement>>;
      }
    }
  }
  declare global {
    namespace Cypress {
      interface Chainable {
        submitClienteForm(sessionCookie: string): Chainable<Response<any>>;
      }
    }
  }
  
  
  
  export {};
  