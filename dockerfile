# 📦 Imagen base oficial Cypress con soporte para configuraciones personalizadas
FROM cypress/factory

# 🔧 ARG: versión específica de Node.js que queremos instalar (editable vía --build-arg)
ARG NODE_VERSION=20.1.0

# 🌍 Variables de entorno útiles para evitar errores comunes y mejorar logs
ENV DBUS_SESSION_BUS_ADDRESS=/dev/null
ENV TERM=xterm
ENV npm_config_loglevel=warn
ENV npm_config_unsafe_perm=true

# 🧹 Limpieza de fuentes problemáticas + preparación de directorios necesarios para Java
RUN rm /etc/apt/sources.list.d/google-chrome.list || true \
  && mkdir -p /usr/share/man/man1

# 🛠️ Instalación de herramientas base: zip, git, curl, Java 17, y Node.js 20.1.0
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    zip git curl openjdk-17-jre && \
    npm install -g n && \
    n ${NODE_VERSION} && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# ☕ Configura el entorno de Java y asegura PATH correcto para Node
ENV JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64
ENV PATH="/usr/local/n/versions/node/${NODE_VERSION}/bin:${PATH}"

# 🔍 Verificación de versiones clave instaladas
RUN node -v && npm -v && java -version

# 📁 Establece el directorio de trabajo del proyecto
WORKDIR /app

# 📦 Copia archivos de dependencias y compila módulos
COPY package*.json tsconfig.json ./
RUN npm install

# 📂 Copia todo el código fuente del proyecto y los archivos .env encriptados
COPY . .
COPY *.enc ./

# 📊 Instala Allure CLI (requiere Java) y servidor estático `serve` para exponer reportes
RUN npm install -g allure-commandline serve

# 🚀 Copia script de entrada personalizado y le da permisos de ejecución
COPY entrypoint.sh /app/entrypoint.sh
RUN chmod +x /app/entrypoint.sh

# 🌐 Expone el puerto 3000 (donde se sirve el reporte Allure)
EXPOSE 3000

# 🎯 Ejecuta el script de arranque que desencripta, corre tests y levanta el reporte
ENTRYPOINT ["sh", "/app/entrypoint.sh"]
