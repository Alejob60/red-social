# Usa una imagen oficial de Node
FROM node:18

# Directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar los archivos de definición de paquetes
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del código
COPY . .

# Construir la app NestJS
RUN npm run build

# Exponer el puerto
EXPOSE 3000

# Comando para ejecutar la app
CMD ["node", "dist/main"]
