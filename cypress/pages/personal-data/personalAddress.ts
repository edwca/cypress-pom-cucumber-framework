export class PersonalAddressPage {
  // === Elementos en iframe padre ===
  getAddressTabFromIframe(
    $body: JQuery<HTMLElement>
  ): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy
      .wrap($body)
      .find("ul#solapa a")
      .contains("Direcciones")
      .should("be.visible");
  }
  // ELementos dentro del iframe anidado Formulario DIRECCION
  // ************ Actions on elemens ************
  // Actions en iframe padre
  clickAddresstabInIframe($body: JQuery<HTMLElement>): void {
    this.getAddressTabFromIframe($body).click({ force: true });
  }
  //.. Actions Dentro de inframe padre
  // *** Actions in iframa aninado con padre
}
