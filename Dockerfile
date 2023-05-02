# Utilizamos una imagen de Node.js como base
FROM node:14-alpine
# Definimos el directorio de trabajo dentro del contenedor
WORKDIR /app
# Copiamos el archivo package.json y package-lock.json al directorio de trabajo
COPY package*.json ./
# Instalamos las dependencias
RUN npm install
# Copiamos el resto de los archivos al directorio de trabajo
COPY . .
# Exponemos el puerto 3000
EXPOSE 3000
# Iniciamos nuestra aplicación
CMD ["npm", "start"]