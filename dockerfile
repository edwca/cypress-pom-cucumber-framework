# Imagen base oficial de Cypress con navegadores
FROM cypress/included:12.12.0

# 🧑 Ejecutamos como root para instalar paquetes
USER root

# 🔧 Previene errores de D-Bus en ejecución de Chrome
ENV DBUS_SESSION_BUS_ADDRESS=/dev/null

# 🧪 Variables útiles para npm y consola
ENV TERM=xterm
ENV npm_config_loglevel=warn
ENV npm_config_unsafe_perm=true

# ✅ Elimina repo conflictivo de Chrome (evita errores GPG)
RUN rm /etc/apt/sources.list.d/google-chrome.list || true

# 📈 Instala zip y git
RUN apt-get update \
    && apt-get install -y --no-install-recommends \
    zip git \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# 🔍 Verificamos versiones
RUN node -v && npm -v && google-chrome --version && zip --version && git --version

# 📁 Directorio de trabajo dentro del contenedor
WORKDIR /app

# 📦 Copia dependencias y las instala
COPY package*.json ./ 
COPY tsconfig.json ./
RUN npm install

# 📂 Copia el resto del proyecto
COPY . .

# 📊 Instala Allure CLI global
RUN npm install -g allure-commandline --save-dev

# 🚀 Comando de ejecución por defecto
CMD ["sh", "-c", "if [ -z \"$ENV_SECRET_KEY\" ]; then echo '❌ Falta ENV_SECRET_KEY'; exit 1; fi && npx tsx scripts/decrypt-env.ts && npm run test:qa-sr"]
