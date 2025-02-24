FROM node:17-alpine

WORKDIR /

COPY ./package*.json ./
# pour l'ancer l'application sur le port 3000
EXPOSE 3000

# pour installer les dépendances 
RUN npm install

# pour copies le cotnue dans le meme dossier 
COPY . .

# Commande pour demmarer l'application backend 
CMD ["npm","start"]
