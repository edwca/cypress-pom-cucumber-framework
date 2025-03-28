// import { defineConfig } from "cypress";
// import dotenv from "dotenv";
// import createBundler from "@bahmutov/cypress-esbuild-preprocessor";
// import { createEsbuildPlugin } from "@badeball/cypress-cucumber-preprocessor/esbuild";
// import { addCucumberPreprocessorPlugin } from "@badeball/cypress-cucumber-preprocessor";

// dotenv.config({ path: `.env.${process.env.CYPRESS_ENV || "qa"}` });

// export default defineConfig({
//   e2e: {
//     baseUrl: process.env.BASE_URL,
//     specPattern: "cypress/e2e/**/*.feature",
//     supportFile: "cypress/support/e2e.ts",
//     stepDefinitions: "cypress/step-definitions",
//     async setupNodeEvents(on, config) {
//       await addCucumberPreprocessorPlugin(on, config);
//       on(
//         "file:preprocessor",
//         createBundler({ plugins: [createEsbuildPlugin(config)] })
//       );
//       return config;
//     },
//   },
// });

// 👇 Importa esto de forma separada para configurar `stepDefinitions`
import { defineConfig } from "cypress";
import dotenv from "dotenv";
import createBundler from "@bahmutov/cypress-esbuild-preprocessor";
import { createEsbuildPlugin } from "@badeball/cypress-cucumber-preprocessor/esbuild";
import { addCucumberPreprocessorPlugin } from "@badeball/cypress-cucumber-preprocessor";

dotenv.config({ path: `.env.${process.env.CYPRESS_ENV || "qa"}` });

export default defineConfig({
  e2e: {
    baseUrl: process.env.BASE_URL,
    env: {
      rut: process.env.RUT,
      username: process.env.LOGIN_USERNAME,
      password: process.env.LOGIN_PASSWORD,
    },
    specPattern: "cypress/e2e/**/*.feature",
    supportFile: "cypress/support/e2e.ts",
    async setupNodeEvents(on, config) {
      await addCucumberPreprocessorPlugin(on, config); // ← el plugin ahora leerá la config automáticamente
      on(
        "file:preprocessor",
        createBundler({ plugins: [createEsbuildPlugin(config)] })
      );
      return config;
    },
  },
});
