export class PersonalDataPage {
  // === Elementos en iframe padre ===
  getPaternIframeGeneralInformation(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get("#leftPanel").contains("Identificación General");
  }

  getRutInputFromIframe(
    $body: JQuery<HTMLElement>
  ): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.wrap($body).find("#rut").should("be.visible");
  }

  getConsultButtonFromIframe(
    $body: JQuery<HTMLElement>
  ): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy
      .wrap($body)
      .find("#btn_consultar")
      .contains("Consultar")
      .should("be.visible");
  }

  //*** ELementos dentro del iframe anidado Formulario DATOS PERSONA
  getNamesInputFromNestedIframe(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy
      .getNestedIframeBody("#ifr_contenido", "#solapa_content")
      .find("#perso_c_nombre")
      .should("be.visible");
  }

  getPaternalSurnameInputFromNestedIfram(): Cypress.Chainable<
    JQuery<HTMLElement>
  > {
    return cy
      .getNestedIframeBody("#ifr_contenido", "#solapa_content")
      .find("#perso_c_paterno")
      .should("be.visible");
  }

  getMaternalSurnameInputFromNestedIframe(): Cypress.Chainable<
    JQuery<HTMLElement>
  > {
    return cy
      .getNestedIframeBody("#ifr_contenido", "#solapa_content")
      .find("#perso_c_materno")
      .should("be.visible");
  }

  getMobileInputFromNestedIframe(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy
      .getNestedIframeBody("#ifr_contenido", "#solapa_content")
      .find("#perso_c_movil")
      .should("be.visible");
  }

  getBirthDateInputFromNestedIframe(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy
      .getNestedIframeBody("#ifr_contenido", "#solapa_content")
      .find("#perso_f_nacimiento")
      .should("be.visible");
  }

  getActivityInputFromNestedIframe(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy
      .getNestedIframeBody("#ifr_contenido", "#solapa_content")
      .find("#ddl_actividad")
      .should("be.visible");
  }

  getLoadInputFromNestedIframe(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy
      .getNestedIframeBody("#ifr_contenido", "#solapa_content")
      .find("#clien_n_carga")
      .should("be.visible");
  }

  getEducationInputFromNestedIframe(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy
      .getNestedIframeBody("#ifr_contenido", "#solapa_content")
      .find("#ddl_nivel_educacional")
      .should("be.visible");
  }

  getProfessionInputFromNestedIframe(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy
      .getNestedIframeBody("#ifr_contenido", "#solapa_content")
      .find("#ddl_profesion")
      .should("be.visible");
  }

  getSerieRutInputFromNestedIframe(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy
      .getNestedIframeBody("#ifr_contenido", "#solapa_content")
      .find("#perso_c_rut_serie")
      .should("be.visible");
  }

  getCedulaExpInputFromNestedIframe(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy
      .getNestedIframeBody("#ifr_contenido", "#solapa_content")
      .find("#perso_f_vencimiento_ci")
      .should("be.visible");
  }

  getGenderInputFromNestedIframe(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy
      .getNestedIframeBody("#ifr_contenido", "#solapa_content")
      .find("#ddl_sexo")
      .should("be.visible");
  }

  getClientOriginInputFromNestedIframe(): Cypress.Chainable<
    JQuery<HTMLElement>
  > {
    return cy
      .getNestedIframeBody("#ifr_contenido", "#solapa_content")
      .find("#ddl_origen_cliente")
      .should("be.visible");
  }

  getOfficeInputFromNestedIframe(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy
      .getNestedIframeBody("#ifr_contenido", "#solapa_content")
      .find("#ddl_sucursal")
      .should("be.visible");
  }

  getNationalityInputFromNestedIframe(): Cypress.Chainable<
    JQuery<HTMLElement>
  > {
    return cy
      .getNestedIframeBody("#ifr_contenido", "#solapa_content")
      .find("#ddl_nacionalidad")
      .should("be.visible");
  }

  getMaritalStatusInputFromNestedIframe(): Cypress.Chainable<
    JQuery<HTMLElement>
  > {
    return cy
      .getNestedIframeBody("#ifr_contenido", "#solapa_content")
      .find("#ddl_estado_civil")
      .should("be.visible");
  }

  getIncomeInputFromNestedIframe(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy
      .getNestedIframeBody("#ifr_contenido", "#solapa_content")
      .find("#ddl_situacion_laboral")
      .should("be.visible");
  }

  getStudentInputFromNestedIframe(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy
      .getNestedIframeBody("#ifr_contenido", "#solapa_content")
      .find("#perso_b_estudiante")
      .should("be.visible");
  }

  getCommercialRelationshipInputFromNestedIframe(): Cypress.Chainable<
    JQuery<HTMLElement>
  > {
    return cy
      .getNestedIframeBody("#ifr_contenido", "#solapa_content")
      .find("#ddl_prop_relacion_comercial")
      .should("be.visible");
  }

  getLegalApInputFromNestedIframe(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy
      .getNestedIframeBody("#ifr_contenido", "#solapa_content")
      .find("#chk_apoderado_legal")
      .should("be.visible");
  }

  getRetiredPersonInputFromNestedIframe(): Cypress.Chainable<
    JQuery<HTMLElement>
  > {
    return cy
      .getNestedIframeBody("#ifr_contenido", "#solapa_content")
      .find("#chk_pensionado")
      .should("be.visible");
  }

  // getSaveButtonFromNestedIframe(): Cypress.Chainable<JQuery<HTMLElement>> {
  //   return cy
  //     .getNestedIframeBody("#ifr_contenido", "#solapa_content")
  //     .find("#btn_guardar") // Asegúrate que este sea el ID correcto
  //     .should("be.visible");
  // }

  // ************ Actions on elemens ************

  //.. Fuera de inframe llamado a iframe padre
  getPaternIfrGeneralInformation(): void {
    this.getPaternIframeGeneralInformation().click({ force: true });
  }

  //.. Actions Dentro de inframe padre
  typeRutInIframe($body: JQuery<HTMLElement>, rut: string): void {
    this.getRutInputFromIframe($body).clear().type(rut);
  }

  clickConsultButtonInIframe($body: JQuery<HTMLElement>): void {
    this.getConsultButtonFromIframe($body).click({ force: true });
  }

  // *** Actions in iframa aninado con padre
  typeNamesInNestedIframe(names: string): void {
    this.getNamesInputFromNestedIframe().clear().type(names);
  }

  typePaternalSurnameInNestedIframe(paternalSurname: string): void {
    this.getPaternalSurnameInputFromNestedIfram().clear().type(paternalSurname);
  }

  typegetMaternalSurnameInputFromNestedIframe(maternalSurname: string): void {
    this.getMaternalSurnameInputFromNestedIframe()
      .clear()
      .type(maternalSurname);
  }

  typegetMobileInputFromNestedIframe(maternalSurname: string): void {
    this.getMobileInputFromNestedIframe().clear().type(maternalSurname);
  }

  typeBirthDateInputFromNestedIframe(birthdate: string): void {
    this.getBirthDateInputFromNestedIframe().clear().type(birthdate);
  }

  typeActivityInputFromNestedIframe(activity: string): void {
    this.getActivityInputFromNestedIframe().select(activity);
  }

  typeLoadInputFromNestedIframe(load: number): void {
    this.getLoadInputFromNestedIframe().clear().type(String(load));
  }
  typeEducationInputFromNestedIframe(education: string): void {
    this.getEducationInputFromNestedIframe().select(education);
  }
  typeProfessionInputFromNestedIframe(profesion: string): void {
    this.getProfessionInputFromNestedIframe().select(profesion);
  }
  typeSerieRutInputFromNestedIframe(serieRut: string): void {
    this.getSerieRutInputFromNestedIframe().clear().type(serieRut);
  }

  typeCedulaExpInputFromNestedIframe(cedula_exp: string): void {
    this.getCedulaExpInputFromNestedIframe().clear().type(cedula_exp);
  }
  typeGenderInputFromNestedIframe(gender: string): void {
    this.getGenderInputFromNestedIframe().select(gender);
  }
  typeClientOriginInputFromNestedIframe(clientOrigin: string): void {
    this.getClientOriginInputFromNestedIframe().select(clientOrigin);
  }
  typeOfficeInputFromNestedIframe(office: string): void {
    this.getOfficeInputFromNestedIframe().select(office);
  }
  typeNationalityInputFromNestedIframe(nationality: string): void {
    this.getNationalityInputFromNestedIframe().select(nationality);
  }
  typeMaritalStatusInputFromNestedIframe(maritalStatus: string): void {
    this.getMaritalStatusInputFromNestedIframe().select(maritalStatus);
  }
  typeIncomeInputFromNestedIframe(income: string): void {
    this.getIncomeInputFromNestedIframe().select(income);
  }
  typeStudentInputFromNestedIframe(student: boolean): void {
    if (student === true) {
      this.getStudentInputFromNestedIframe().check();
    }
  }
  typeCommercialRelationshipInputFromNestedIframe(
    commercialRelations: string
  ): void {
    this.getCommercialRelationshipInputFromNestedIframe().select(
      commercialRelations
    );
  }

  typeLegalApInputFromNestedIframe(legalAp: boolean): void {
    if (legalAp === true) {
      this.getLegalApInputFromNestedIframe().check();
    }
  }
  typeRetiredPesonInputFromNestedIframe(retiredPerson: boolean): void {
    if (retiredPerson === true) {
      this.getRetiredPersonInputFromNestedIframe().check();
    }
  }


  getSaveButtonFromNestedIframe(
    $body: JQuery<HTMLElement>
  ): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy
      .wrap($body)
      .find("#saveChanges")
      .contains("Guardar cambios")
      .should("be.visible");
  }


  clickSaveButtonFromNestedIframe($body: JQuery<HTMLElement>){
    this.getSaveButtonFromNestedIframe($body).click({ force: true });
  }
  
  




}
