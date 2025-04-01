import { Then, When } from "@badeball/cypress-cucumber-preprocessor";

import { obtenerRutInvalido, obtenerRutValido } from "../../utils/rutService";
import { interceptAlert } from "../../utils/interceptAlert";
import { invalidRut } from "../../utils/alertsValidations";
import { generalIdentificationAlertPatterns } from "../../utils/patrones/alertsGeneraldentification";
import { PersonalDataPage } from "../../pages/personal-data/personalDataPage";

const personalDataPage = new PersonalDataPage();

Then("navego al módulo Identificación General", () => {
  personalDataPage.clickIframeGeneralInformation();
  cy.screenshotStep("Inicio del test");
});

Then("consulto por rut {string} en identificación general", (type: string) => {
  const rut = type === "VALID" ? obtenerRutValido() : obtenerRutInvalido();
  cy.getIframeGeneralInformation("#ifr_contenido").then(($body: any) => {
    const iframeWindow = $body[0].ownerDocument.defaultView;
    // Interceptamos el alert del iframe
    interceptAlert(iframeWindow);
    personalDataPage.typeRutInIframe($body, rut);
    personalDataPage.clickConsultButtonInIframe($body);
  });

  if (type === "INVALID") {
    invalidRut(generalIdentificationAlertPatterns);
  }
});

When("completo los campos solicitados {string} {string} {int} {string} {string} {string} {string} {string} {string} {string} {string} {string} {string} {string} {string}",(
    birthdate: string,
    activiy: string,
    load: number,
    education: string,
    profession: string,
    serieRut: string,
    cedula_exp: string,
    gender: string,
    client_origin: string,
    office: string,
    nationality: string,
    marital_status: string,
    income: string,
    student: string,
    commercial_relations: string
  ) => {
    cy.getNestedIframeBody("#ifr_contenido", "#solapa_content").then(() => {
      personalDataPage.typeNamesInNestedIframe("Juanito"); // names
      personalDataPage.typePaternalSurnameInNestedIframe("Pérez"); // paternalSurname
      personalDataPage.typegetMaternalSurnameInputFromNestedIframe("González"); // maternalSurname
      personalDataPage.typegetMobileInputFromNestedIframe("34343243"); // mobile
      personalDataPage.typeBirthDateInputFromNestedIframe(birthdate); // birthdate
      personalDataPage.typeActivityInputFromNestedIframe(activiy); // activity
      personalDataPage.typeLoadInputFromNestedIframe(load); // load
      personalDataPage.typeEducationInputFromNestedIframe(education); // education
      personalDataPage.typeProfessionInputFromNestedIframe(profession); // profession
      personalDataPage.typeSerieRutInputFromNestedIframe(serieRut); // profession

      personalDataPage.typeCedulaExpInputFromNestedIframe(cedula_exp); // Expiracion de cedula
      personalDataPage.typeGenderInputFromNestedIframe(gender); // Genero
      personalDataPage.typeClientOriginInputFromNestedIframe(client_origin); // Origen de cliente
      personalDataPage.typeOfficeInputFromNestedIframe(office); // Oficina
      personalDataPage.typeNationalityInputFromNestedIframe(nationality); // Nacionalidad
      personalDataPage.typeMaritalStatusInputFromNestedIframe(marital_status); // Estado Civil
      personalDataPage.typeIncomeInputFromNestedIframe(income); // Tipo de ingreso
      personalDataPage.typeStudentInputFromNestedIframe(student); // Relacion Comercial
      personalDataPage.typeCommercialRelationshipInputFromNestedIframe(commercial_relations); // Relacion Comercial



    });
  }
);

export {};
