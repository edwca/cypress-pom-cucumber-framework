
export class PersonalDataPage {
  // === Fuera del iframe ===
  getIframeGeneralInformation(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get("#leftPanel").contains("Identificación General");
  }

  // === Dentro del iframe ===

  getRutInputFromIframe($body: JQuery<HTMLElement>): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.wrap($body).find("#rut").should("be.visible");
  }
  
  getConsultButtonFromIframe($body: JQuery<HTMLElement>): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.wrap($body).find("#btn_consultar").contains("Consultar").should("be.visible");
  }

    //*** Formulario
  getNamesInputFromNestedIframe(): Cypress.Chainable<JQuery<HTMLElement>> {
    return  cy.getNestedIframeBody("#ifr_contenido", "#solapa_content").find("#perso_c_nombre").should("be.visible")
  }

  getPaternalSurnameInputFromNestedIfram(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.getNestedIframeBody("#ifr_contenido", "#solapa_content").find("#perso_c_paterno").should("be.visible");
  }

  getMaternalSurnameInputFromNestedIframe(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.getNestedIframeBody("#ifr_contenido", "#solapa_content").find("#perso_c_materno").should("be.visible");
  }

  getMobileInputFromNestedIframe(): Cypress.Chainable<JQuery<HTMLElement>> {
    return  cy.getNestedIframeBody("#ifr_contenido", "#solapa_content").find("#perso_c_movil").should("be.visible")
  }

  getBirthDateInputFromNestedIframe(): Cypress.Chainable<JQuery<HTMLElement>> {
    return  cy.getNestedIframeBody("#ifr_contenido", "#solapa_content").find("#perso_f_nacimiento").should("be.visible")
  }

  getActivityInputFromNestedIframe(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.getNestedIframeBody("#ifr_contenido", "#solapa_content").find("#ddl_actividad").should("be.visible");
  }

  getLoadInputFromNestedIframe(): Cypress.Chainable<JQuery<HTMLElement>> {
    return  cy.getNestedIframeBody("#ifr_contenido", "#solapa_content").find("#clien_n_carga").should("be.visible")
  }

  getEducationInputFromNestedIframe(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.getNestedIframeBody("#ifr_contenido", "#solapa_content").find("#ddl_nivel_educacional").should("be.visible");
  }
  getProfessionInputFromNestedIframe(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.getNestedIframeBody("#ifr_contenido", "#solapa_content").find("#ddl_profesion").should("be.visible");
  }

  getSerieRutInputFromNestedIframe(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.getNestedIframeBody("#ifr_contenido", "#solapa_content").find("#perso_c_rut_serie").should("be.visible");
  }

 


  // ************ Actions on elemens ************

  //.. Fuera de inframe
  clickIframeGeneralInformation(): void {
    this.getIframeGeneralInformation().click({ force: true });
  }

  //.. Actions Dentro de inframe
  typeRutInIframe($body: JQuery<HTMLElement>, rut: string): void {
    this.getRutInputFromIframe($body).clear().type(rut);
  }

  clickConsultButtonInIframe($body: JQuery<HTMLElement>): void {
    this.getConsultButtonFromIframe($body).click({ force: true });
  }

  // *** Actions in Formulario anidado
  typeNamesInNestedIframe(names: string): void {
    this.getNamesInputFromNestedIframe().clear().type(names);
  }

  typePaternalSurnameInNestedIframe(paternalSurname: string): void {
    this.getPaternalSurnameInputFromNestedIfram().clear().type(paternalSurname);
  }

  typegetMaternalSurnameInputFromNestedIframe(maternalSurname: string): void {
    this.getMaternalSurnameInputFromNestedIframe().clear().type(maternalSurname);
  }

  typegetMobileInputFromNestedIframe(maternalSurname: string): void {
    this.getMobileInputFromNestedIframe().clear().type(maternalSurname);
  }
  
  typeBirthDateInputFromNestedIframe(birthdate: string): void {
    this.getBirthDateInputFromNestedIframe().clear().type(birthdate);
  }

  typeActivityInputFromNestedIframe(activity: string): void {
    this.getActivityInputFromNestedIframe().select(activity)
  }

  typeLoadInputFromNestedIframe(load:number): void {
   
    this.getLoadInputFromNestedIframe().clear().type(String(load))
  }
  typeEducationInputFromNestedIframe(education:string): void {
    this.getEducationInputFromNestedIframe().select(education)
  }
  typeProfessionInputFromNestedIframe(profesion:string): void {
    this.getProfessionInputFromNestedIframe().select(profesion)
  }
  typeSerieRutInputFromNestedIframe(serieRut:string): void {
    this.getSerieRutInputFromNestedIframe().clear().type(serieRut)
  }


 
}
