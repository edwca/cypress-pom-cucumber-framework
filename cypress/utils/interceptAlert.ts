/* eslint-disable @typescript-eslint/no-explicit-any */
export function interceptAlert(iframeWindow: any) {
  // Interceptamos el alert dentro del iframe
  cy.wrap(null).then(() => {
    cy.log("✅ Alert interceptado");
    cy.stub(iframeWindow, "alert").as("iframeAlert");
  });
}


export function interceptAlertNestedIframe(iframeWindow: any) {
  cy.wrap(null).then((data) => {
    cy.log("data", data);
    cy.log("✅ Alert interceptado");
    cy.stub(iframeWindow, "alert").as("iframeAlert");

  });
}
