FROM node:16

WORKDIR /

COPY ./package*.json ./
# Ouverture sur port 3000
EXPOSE 3000

# Dependances
RUN npm install

RUN npm install mongodb

# copies des fichiers sources
COPY . .

# Demarre l'app
CMD ["npm","start"]