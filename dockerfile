FROM cypress/browsers:node-20.11.1-chrome-124.0.6367.208-1-ff-124.0-edge-124.0.2478.67

# Define el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia archivos clave y luego instala dependencias
COPY package*.json ./
COPY tsconfig.json ./
RUN npm install

# Copia el resto del proyecto
COPY . .

# Instala Allure CLI globalmente
RUN npm install -g allure-commandline --save-dev

# Define la variable ENV_SECRET_KEY (puede ser sobrescrita con --build-arg o -e)
ARG ENV_SECRET_KEY
ENV ENV_SECRET_KEY=$ENV_SECRET_KEY

# Desencripta variables antes de ejecutar pruebas
RUN if [ -z "$ENV_SECRET_KEY" ]; then echo "Falta ENV_SECRET_KEY"; exit 1; fi && \
    npx tsx scripts/decrypt-env.ts

# Ejecuta los tests en QA
CMD ["npm", "run", "test:qa-sr"]
