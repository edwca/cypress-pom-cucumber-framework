# Imagen base oficial de Cypress (incluye navegadores + Node.js)
FROM cypress/included:12.12.0

# Ejecutamos como root para instalar dependencias del sistema
USER root

# 🔧 Variables útiles y previene errores comunes
ENV DBUS_SESSION_BUS_ADDRESS=/dev/null
ENV TERM=xterm
ENV npm_config_loglevel=warn
ENV npm_config_unsafe_perm=true

# ✅ Elimina repositorios conflictivos (Chrome)
RUN rm /etc/apt/sources.list.d/google-chrome.list || true

# 🧱 Prepara directorios requeridos para man y Java
RUN mkdir -p /usr/share/man/man1

# 📦 Instala utilidades necesarias: zip, git, Java (OpenJDK 17), y servidor HTTP
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    zip git openjdk-17-jre && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# ☕ Configura JAVA
ENV JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64
ENV PATH="${JAVA_HOME}/bin:${PATH}"

# 🔍 Verifica versiones clave
RUN node -v && npm -v && google-chrome --version && zip --version && git --version && java -version

# 📁 Directorio de trabajo del proyecto
WORKDIR /app

# 📦 Copia dependencias e instala
COPY package*.json ./ 
COPY tsconfig.json ./
RUN npm install

# 📂 Copia todo el proyecto
COPY . .

# ✅ Asegúrate de copiar los archivos encriptados
COPY *.enc ./

# 📊 Instala Allure CLI (requiere Java) y servidor HTTP
RUN npm install -g allure-commandline serve --save-dev

# 🖥️ Expone puerto del reporte
EXPOSE 3000

# 🚀 Copia script de entrada
COPY entrypoint.sh /app/entrypoint.sh
RUN chmod +x /app/entrypoint.sh

# 🎯 Ejecuta el script que hace todo: decrypt + test + serve report
ENTRYPOINT ["sh", "/app/entrypoint.sh"]
