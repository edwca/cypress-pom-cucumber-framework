// import { Then } from '@badeball/cypress-cucumber-preprocessor';
/* eslint-disable @typescript-eslint/no-explicit-any */

import { DataTable, Then, When } from "@badeball/cypress-cucumber-preprocessor";
import {
  generalIdentificationAlertPatterns,
  generalConfirmIdentificationAlertPatterns,
} from "../../utils/patrones/alertsGeneraldentification";
import {
  interceptAlert,
  interceptAlertNestedIframe,
} from "../../utils/interceptAlert";
import {
  invalidRut,
  validateConfirmAlertMessages,
} from "../../utils/alertsValidations";
import { obtenerRutInvalido, obtenerRutValido } from "../../utils/rutService";
import {
  PersonalDataPage,
  PersonalAddressPage,
} from "../../pages/personal-data";

const personalDataPage = new PersonalDataPage();
const personalAddressPage = new PersonalAddressPage();

let dataFirstPart: Record<string, any> = {};
let dataSecondPart: Record<string, any> = {};

Then("navego al módulo Identificación General", () => {
  personalDataPage.getPaternIfrGeneralInformation();
  cy.screenshotStep("Inicio del test");
});

Then("consulto por un nuevo rut {string} en modulo identificación general",(type: string) => {
    const rut = type === "VALID" ? obtenerRutValido() : obtenerRutInvalido();
    cy.log("*****rut******", rut);
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
    cy.screenshotStep("consulta rut");
  });

When("completo la primera parte de los campos solicitados",
  (dataTable: DataTable) => {
    const [headers, values] = dataTable.raw();

    const data: Record<string, string> = {};
    headers.forEach((header, index) => {
      data[header.trim().toUpperCase()] = values[index].trim();
    });

    dataFirstPart = {
      birthdate: data.BIRTHDATE,
      activity: data.ACTIVITY,
      load: Number(data.LOAD),
      education: data.EDUCATION,
      profession: data.PROFESSION,
      serieRut: data.SERIERUT,
      cedula_exp: data.CEDULA_EXP,
      gender: data.GENDER,
    };

    cy.getNestedIframeBody("#ifr_contenido", "#solapa_content").then(() => {
      personalDataPage.typeNamesInNestedIframe("Juanito"); // names
      personalDataPage.typePaternalSurnameInNestedIframe("Pérez"); // paternalSurname
      personalDataPage.typegetMaternalSurnameInputFromNestedIframe("González"); // maternalSurname
      personalDataPage.typegetMobileInputFromNestedIframe("123456789"); // mobile
      personalDataPage.typeBirthDateInputFromNestedIframe(data["BIRTHDATE"]); // birthdate
      personalDataPage.typeActivityInputFromNestedIframe(data["ACTIVITY"]);
      personalDataPage.typeLoadInputFromNestedIframe(Number(data["LOAD"]));
      personalDataPage.typeEducationInputFromNestedIframe(data["EDUCATION"]);
      personalDataPage.typeProfessionInputFromNestedIframe(data["PROFESSION"]);
      personalDataPage.typeSerieRutInputFromNestedIframe(data["SERIERUT"]);
      personalDataPage.typeCedulaExpInputFromNestedIframe(data["CEDULA_EXP"]);
      personalDataPage.typeGenderInputFromNestedIframe(data["GENDER"]);
    });
  }
);

When(
  "completo la segunda parte de los campos solicitados",
  (dataTable: DataTable) => {
    const [headers, values] = dataTable.raw();

    const data: Record<string, string> = {};
    headers.forEach((header, index) => {
      data[header.trim().toUpperCase()] = values[index].trim();
    });

    dataSecondPart = {
      client_origin: data.CLIENT_ORIGIN,
      office: data.OFFICE,
      nationality: data.NATIONALITY,
      marital_status: data.MARITAl_STATUS,
      income: data.INCOME,
      student: data.STUDENT,
      commercial_relations: data.COMMERCIAL_RELATIONSHIP,
      legal_ap: data.LEGAL_AP,
      retired_person: data.RETIRED_PERSON,
    };

    const valueStudent = data["STUDENT"] === "NO" ? false : true;
    const valueLegalAp = data["LEGAL_AP"] === "NO" ? false : true;
    const valueRetiredPerson = data["RETIRED_PERSON"] === "NO" ? false : true;

    cy.getNestedIframeBody("#ifr_contenido", "#solapa_content").then(() => {
      personalDataPage.typeClientOriginInputFromNestedIframe(
        data["CLIENT_ORIGIN"]
      );
      personalDataPage.typeOfficeInputFromNestedIframe(data["OFFICE"]);
      personalDataPage.typeNationalityInputFromNestedIframe(
        data["NATIONALITY"]
      );
      personalDataPage.typeMaritalStatusInputFromNestedIframe(
        data["MARITAL_STATUS"]
      );
      personalDataPage.typeIncomeInputFromNestedIframe(data["INCOME"]);
      personalDataPage.typeStudentInputFromNestedIframe(valueStudent);
      personalDataPage.typeCommercialRelationshipInputFromNestedIframe(
        data["COMMERCIAL_RELATIONSHIP"]
      );
      personalDataPage.typeLegalApInputFromNestedIframe(valueLegalAp);
      personalDataPage.typeRetiredPesonInputFromNestedIframe(
        valueRetiredPerson
      );
    });

    const fullData = {
      firstPart: dataFirstPart,
      secondPart: dataSecondPart,
    };

    cy.task("writeFixture", {
      filename: "dataPerson.fixture.json",
      data: fullData,
    });
  }
);


Then("presiono el botón {string}", (type: string) => {

  // padre
  cy.getIframeGeneralInformation("#ifr_contenido").then(($fatherBody: any) => {
    //---> hijo
    cy.getNestedIframeBody("#ifr_contenido", "#solapa_content").then(($SonBody) => {
        const contentHijo =$SonBody[0].ownerDocument.defaultView;
        
        interceptAlertNestedIframe(contentHijo);
      
        personalDataPage.clickSaveButtonFromNestedIframe($SonBody)
         
        // Interceptamos el alert dentro del iframe hijo
         cy.get("@iframeAlert").then((alertStub: any) => {
          const llamadas = alertStub.getCalls().map((call: any) => call.args[0]);
          cy.log(`Cantidad de alertas recibidas 1: ${llamadas.length}`);
          llamadas.forEach((msg: string, i: number) => cy.log(`Alerta ${i + 1}: ${msg}`));
          // Esperamos solo 1 alerta con el mensaje exacto
          expect(llamadas).to.have.lengthOf.at.least(1);
          const mensajeEsperado = "Datos actualizados con éxito.";
          // Validamos que al menos una alerta tenga el mensaje esperado
          const contieneMensajeEsperado = llamadas.some((msg: string) => msg === mensajeEsperado);
          expect(contieneMensajeEsperado).to.be.true;
        });
        
      }
    );
  });
});





When("me dirijo a la seccion {string} para completar el detalle de lo que se solicita",
  (tab: string) => {
    cy.log("tab", tab);
    cy.getIframeGeneralInformation("#ifr_contenido").then(($body: any) => {
      switch (tab) {
        case "DIRECCIONES":
          personalAddressPage.clickAddresstabInIframe($body);
          cy.pause();
          break;
        case (tab = "DIRECCIONES(E)"):
          // personalDataPage.clickContactDataTabInIframe();
          break;
        case (tab = "FAMILIARES"):
          // personalDataPage.clickResidenceDataTabInIframe();
          break;
        case (tab = "CONVENIO"):
          // personalDataPage.clickWorkDataTabInIframe();
          break;
        case (tab = "REFERENCIA"):
          // personalDataPage.clickWorkDataTabInIframe();
          break;
        case (tab = "INFORMACIÓN LABORAL"):
          // personalDataPage.clickWorkDataTabInIframe();
          break;
        default:
          throw new Error(`La pestaña ${tab} no es válida.`);
      }
    });
  }
);

export {};
