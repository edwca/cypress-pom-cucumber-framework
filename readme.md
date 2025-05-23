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
npm run test	                #Ejecuta todas las pruebas en modo headless, sin entorno específico.
npm run cy:open	              #Abre la GUI de Cypress en entorno qa, con Allure activado.
npm run test:qa-sr	          #Ejecuta pruebas en qa sin @skip, genera Allure (usado en CI).
npm run test:qa	              #Ejecuta en qa, genera y abre reporte Allure. 
npm run test:devel	          #Igual al anterior pero en devel. 
npm run test:regresion	      #Igual pero en regresion. 
```

## Otros comandos utiles
```bash
npm run test:connectiondb	    #Ejecuta una prueba de conexión a base de datos con entorno qa.
npm run repair:cy	            #Limpia el caché de Cypress y reinstala el binario.
npm run clean:cycache	        #Limpia archivos temporales personalizados de Cypress.
```

## 📊 Reporteria

```bash
"allure:generate":              #genera el reporte a partir de los resultados en allure-results.
"allure:open":                  #abre el reporte en el navegador.
"allure:clear":                 #limpia los reportes anteriores.
"allure open ." :               #Todos los scripts de prueba (test:*) incluyen la generación y apertura del reporte automáticamente.
                                #Para ver los resultados de las pruebas a través de ci/cd una vez que descargamos desde el JOB el artefacto,
                                #necesitamos ir a la ruta del reporte y ejecutar con powerShell el comando allure open .
```

---

## ⚙️ Variables de entorno

Las variables sensibles se encuentran en archivos `.env` encriptados. Para trabajar localmente:

### 🔓 Desencriptar:

Nota: Importante siempre correr este comando para tener los .env actualizados desde la rama main

```bash
npm run decrypt:env
```

### 🔐 Encriptar (antes de subir a Git):

Nota: Importante cada vez que modifiquemos un .env debemos ejecutar este comando para subir los cambios
a la rama main y mantener todo actualizado

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

## 🐳 Docker > Constucción y ejecución de test

> En el presente proyecto "Cypress + Node 20.1.0 + Java 17 + Allure", utilizamos un dockerfile personalizado para la ejecución de los test. Los script 
de construcción y ejecución de la imagen que se encuentran indicados en el package.json. 
A modo de lectura y aprendizaje podemos ver un proceso similar registrado en:
https://medium.com/testing-with-cypress/running-cypress-tests-in-docker-containers-using-different-docker-images-2dee3450881e

> Tambien en el proyecto utilizamos imagen de cypress "cypress/included:12.12.0" ya que esta ya contiene:

```bash
Componente	   Detalle
Cypress	       Versión 12.12.0
Node.js	       Node v18.16.0
npm	           Incluido junto con Node.js
Google         Chrome	Chrome 113.0.5672.92
Chromedriver	 Incluido, compatible con la versión de Chrome
Xvfb	         Virtual framebuffer necesario para ejecutar navegadores sin interfaz
Sistema        operativo base	debian:bullseye-slim
Cypress        CLI instalado globalmente (cypress run, cypress open, etc.)
Dependencias   necesarias para correr navegadores headless
Herramientas   del sistema esenciales (como bash, curl, etc.)
```

> 🔍 ¿Qué no incluye?
```bash
Java       (Instalado en imagen manualmente openjdk-17, necesario para reportes allure)
Allure CLI (Instalado en imagen manualmente)
Git        (Instalado en imagen manualmente)
zip, unzip, o utilidades auxiliares (Instalado en imagen manualmente como lo hiciste tú)
Navegadores Firefox o Edge (instalado en imagen manualmente solo Chrome)
```

## 🐳 Comandos de ejecución:
```bash
# Comando para construir imagen con la variable de entorno expuesta
npm run docker:build

# Comando para correr los test y generar allure resulst
npm run docker:run

#Eliminar imagen buildeada con npm
# por defecto elimina las imagenes con nombre cypress-tests
npm run docker:clean

```

## 🐳 Docker Comandos Generales
```bash
# Para eliminar una imagen con contenedor
# 1.- Listar los contenedores, incluso detenidos
docker ps -a

# 2.- Eliminar un contenedor que usa esa imagen
docker rm -f da9d536dccdb

# 3.- Eliminar un contenedor que usa esa imagen
docker rm -f da9d536dccdb

#Detener una imagen con un contenedor ya funcionando
docker stop id_image
Ej: docker stop 4671ca6a5693

# Modo interactivo de docker (podemos ver su contenido)
docker build -t cypress-tests --build-arg ENV_SECRET_KEY=Name_Key .

# Dentro del contenedor:
docker run -it --rm --entrypoint /bin/sh cypress-tests
ls -la #Permite ver los archivos dentro del contenedor

IMPORTANTE: Se necesita permisos de administrador par ejecutar los comandos desde powershell
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
- Se adiciona al proyecto archivo cypress-cucumber-preprocesor.config.ts:

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

## 🧠 Linter
Archivo de congiguración ".eslintrc.js"

```
npm install --save-dev eslint @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-plugin-cypress eslint-plugin-cucumber

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
