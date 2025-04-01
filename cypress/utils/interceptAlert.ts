export function interceptAlert(iframeWindow: any) {
  // Interceptamos el alert dentro del iframe
  cy.wrap(null).then(() => {
    cy.stub(iframeWindow, "alert").as("iframeAlert");
  });
}
