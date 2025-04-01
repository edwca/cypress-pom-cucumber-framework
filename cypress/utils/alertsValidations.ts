// Funccion qu recibe patrones para validar en las alertas 
export function invalidRut(patronesEsperados: RegExp[]) {
    cy.get("@iframeAlert").then((alertStub: any) => {
      const llamadas = alertStub.getCalls().map((call: any) => call.args[0]);
      cy.log(`Cantidad de alertas recibidas: ${llamadas.length}`);
      llamadas.forEach((msg: string, i: number) => cy.log(`Alerta ${i + 1}: ${msg}`));
  
      llamadas.forEach((msg: string) => {
        const coincideConAlgunPatron = patronesEsperados.some((regex) => regex.test(msg));
        expect(msg).to.match(
          coincideConAlgunPatron ? /.*/ : /^(nunca-coincide)$/,
          `La alerta "${msg}" no coincide con ningún patrón esperado`
        );
      });
    });
  }
  