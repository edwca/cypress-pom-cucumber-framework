import { defineConfig } from "cypress";
import dotenv from "dotenv";
import createBundler from "@bahmutov/cypress-esbuild-preprocessor";
import { createEsbuildPlugin } from "@badeball/cypress-cucumber-preprocessor/esbuild";
import { addCucumberPreprocessorPlugin } from "@badeball/cypress-cucumber-preprocessor";
import { testSqlConnection } from "./database/utils/allDatabase";
import { getCategoriasWeb } from "./database/utils/getCategoriasWeb";
import cypressOnFix from "cypress-on-fix";
import { allureCypress } from "allure-cypress/reporter";
import os from "os";
import { Status } from "allure-js-commons";

dotenv.config({ path: `.env.${process.env.CYPRESS_ENV || "qa"}` });

export default defineConfig({
  e2e: {
    baseUrl: process.env.BASE_URL,
    viewportWidth: 1440,
    viewportHeight: 1000,
    env: {
      allure: true,
      rut: process.env.RUT,
      username: process.env.LOGIN_USERNAME,
      password: process.env.LOGIN_PASSWORD,
    },
    specPattern: "cypress/e2e/**/*.feature",
    supportFile: "cypress/support/e2e.ts",
    async setupNodeEvents(on, config) {
      on = cypressOnFix(on);
      await addCucumberPreprocessorPlugin(on, config);
      on(
        "file:preprocessor",
        createBundler({ plugins: [createEsbuildPlugin(config)] })
      );

      // Agregamos tareas personalizadas + tareas requeridas por Allure
      on("task", {
        testSqlConnection: async () => {
          const dbNames = await testSqlConnection();
          return dbNames;
        },
        getCategoriasWeb: async () => {
          const categorias = await getCategoriasWeb();
          return categorias;
        },

        // Fix para tareas que Allure necesita (evita errores "task not handled")
        writeAllureResults: () => null,
        allureWriter: () => null,
      });

      allureCypress(on, config, {
        resultsDir: "allure-results",
        environmentInfo: {
          environment: process.env.CYPRESS_ENV || "qa",
          os_platform: os.platform(),
          os_release: os.release(),
          node_version: process.version,
        },
        categories: [
          {
            name: "Errores de validación",
            messageRegex: ".*expected.*to.*",
            matchedStatuses: [Status.FAILED],
          },
          {
            name: "Errores inesperados",
            messageRegex: ".*Exception.*",
            matchedStatuses: [Status.BROKEN],
          },
        ],
        links: {
          issue: {
            nameTemplate: "Jira #%s",
            urlTemplate: "https://jira.example.com/browse/%s",
          },
        },
      });

      // 🔎 Diagnóstico de si allure está activo
      if (process.env.allure === "true") {
        console.log("Allure reporter activado");
      } else {
        console.warn(
          "⚠️  Allure reporter desactivado. Ejecuta los tests con: allure=true\n" +
            "Ejemplo: cross-env CYPRESS_ENV=qa allure=true npm run test:qa"
        );
      }

      return config;
    },
  },
});
