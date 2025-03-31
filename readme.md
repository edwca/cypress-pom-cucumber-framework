# Detacoop Automation Framework

Este proyecto creado en nodejs utiliza las tecnologias cypress con cucumber donde se utliza el lenguaje Gherkin que permite mejor legibilidad de los casos de pruebas de forma natural y sencilla utilizando la técnica BDD, además se puede desarrollar bajo javascript utilizando el super set de TypeScript. El proyecto esta estructurado con el patron de diseño Page Object Model y completamente preparado para ejecutarse en distintos entornos mediante archivos `.env` y GitHub Actions, tambien cuenta con una configuración standar de docker.

## Requisitos

- Node.js >= 18
- Docker (opcional)
- Git
- Extension (Material Icon Theme, cucumber , test cucumber (Gherkin) Full Support )

---

## 📁 Estructura del Proyecto

```
Detacoop_Automation/
├── .github/
│   └── workflows/
│       └── cypress.yml              # CI en GitHub Actions
├── .vscode/
│   └── settings.json                # Configuración del workspace VSCode
├── cypress/
│   ├── downloads/                   # Archivos descargados durante tests
│   ├── e2e/                         # Archivos feature Gherkin
│   │   ├── login/
│   │   │   └── loginGeneraltest.feature
│   │   └── pruebaConexion/
│   │       └── testDbConnection.feature
│   ├── fixtures/                    # Datos estáticos de prueba
│   │   └── example.json
│   ├── pages/                       # Page Objects
│   │   └── loginPage.ts
│   ├── screenshots/                # Evidencias de ejecución
│   │   └── pruebaConexion/
│   ├── step-definitions/           # Steps para Cucumber
│   │   ├── loginGeneralTest.steps.ts
│   │   └── testDbConnection.ts
│   └── support/                    # Archivos de soporte (custom commands, hooks, etc.)
│       ├── commands.ts
│       ├── e2e.ts
│       └── index.ts
├── database/
│   ├── utils/
│   │   ├── allDatabase.ts          # Consulta de todas las DBs
│   │   └── getCategoriasWeb.ts     # Consulta específica
│   └── database.ts                 # Configuración general DB
├── scripts/
│   ├── encrypt-env.ts              # Encriptar archivos .env
│   └── decrypt-env.ts              # Desencriptar archivos .env
├── services/
│   └── userFormatRut.ts            # Lógica reutilizable (ej. formateo RUT)
├── types/
│   └── typesTemplate.ts            # Tipado global (interfaces, enums, etc.)
├── .env.qa                         # Variables QA (encriptado recomendado)
├── .env.devel                      # Variables Devel
├── .env.regresion                 # Variables para regresión
├── .gitignore
├── cypress-cucumber-preprocessor.config.ts
├── cypress.config.ts              # Config principal Cypress + plugins
├── dockerfile                     # (opcional) Contenedor Docker
├── package.json                   # Scripts y dependencias
├── package-lock.json
├── tsconfig.json
└── README.md
```

---

## 🚀 Instalación del Proyecto

```bash
npm install
```

---

## 🧪 Comandos para ejecutar pruebas

```bash
npm run cy:open           # Ejecuta Cypress con entorno QA en modo interactivo
npm run test:qa           # Ejecuta las pruebas en entorno QA (headless)
npm run test:devel        # Ejecuta las pruebas en entorno Desarrollo
npm run test:regresion    # Ejecuta las pruebas en entorno Regresión
```

## 📊 Reporteria
```bash
allure:generate: genera el reporte a partir de los resultados en allure-results.
allure:open: abre el reporte en el navegador.
allure:clear: limpia los reportes anteriores.
Todos los scripts de prueba (test:*) incluyen la generación y apertura del reporte automáticamente.
```
---

## ⚙️ Variables de entorno

Las variables sensibles se encuentran en archivos `.env` encriptados. Para trabajar localmente:

### 🔓 Desencriptar:
```bash
npm run decrypt:env
```

### 🔐 Encriptar (antes de subir a Git):
```bash
npm run encrypt:env
```

> Requiere definir una clave de entorno `ENV_SECRET_KEY`. Puedes exportarla temporalmente:

```bash
export ENV_SECRET_KEY=clave_segura_123
```

Los scripts se encuentran en `scripts/encrypt-env.ts` y `scripts/decrypt-env.ts` y usan la librería `crypto` + `glob` + `tsx` para ejecutarse sin necesidad de compilar manualmente.

---

## 🧩 Soporte para Cucumber en VS Code

Se recomienda instalar la extensión:

🔌 **test Cucumber (Gherkin) Full Support** — `Robin GROSS`

Y añadir este archivo `.vscode/settings.json`:

```json
{
  "cucumberautocomplete.steps": [
    "cypress/step-definitions/**/*.ts",
    "cypress/step-definitions/**/*.js"
  ],
  "cucumberautocomplete.syncfeatures": "cypress/e2e/**/*.feature",
  "cucumberautocomplete.strictGherkinCompletion": true,
  "cucumberautocomplete.smartSnippets": true
}
```

Esto habilita navegación con `Ctrl + clic`, autocompletado y validación de steps.

---

## 🐳 Docker

```bash
docker build -t cypress-tests .
docker run --rm cypress-tests
```

---

## 🛠️ GitHub Actions

Se ejecuta automáticamente en cada push a `devel` y `main` mediante `.github/workflows/cypress.yml`.

---

## 🧠 Consideraciones

- Todos los comandos personalizados están en `commands.ts`
- Las credenciales se leen desde `.env.[entorno]` y son inyectadas en `cypress.config.ts`
- El patrón Page Object Model está definido en `cypress/pages`
- La integración con base de datos comienza en `database/database.ts`

---

> Proyecto validado en VS Code 1.98.2 usando la extensión "test Cucumber (Gherkin) Full Support" con TypeScript.


## 🧠 Configuraciones adicionales
- Adicionar al proyecto archivo cypress-cucumber-preprocesor.config.ts:

```
const config = {
  stepDefinitions: ['cypress/step-definitions/**/*.{js,ts}'],
};

export default config;
```

- tsconfig.json

```
{
    "compilerOptions": {
      "target": "ES2020",
      "lib": ["es2020", "dom"],
      "module": "ESNext",
      "moduleResolution": "node",
      "strict": true,
      "esModuleInterop": true,
      "types": ["cypress"]
    },
    "include": [
      "cypress/**/*.ts",
      "cypress/step-definitions/**/*.{js,ts}",
      "cypress/support/index.d.ts"
    ]
  }
  ```

  ## 🧠 Convenciones

Asi como en todo lenguaje existen formas de escribir, el proyecto no es la excepción, es por ello que:

Convenciones de archivos:
- Usar camelCase para los nombres de archivos
- Usar .ts para los archivos de implementación
- Usar .tsx para los archivos que contienen JSX
- Usar .service.ts para los archivos de servicios
- Usar .controller.ts para los archivos de controladores

Convenciones de nomenclatura 
- Usar camelCase para los nombres de variables y funciones
- Usar PascalCase para los nombres de clases e interfaces
- Usar camelCase para los miembros de interfaces
- Usar PascalCase para nombres de tipos y enumeraciones

---