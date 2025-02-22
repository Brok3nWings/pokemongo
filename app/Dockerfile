# Utiliser une image officielle de Node.js 18
FROM node:18

# Définir le répertoire de travail à la racine du projet
WORKDIR /usr/src/app

# Copier uniquement package.json et package-lock.json
COPY package*.json ./

# Vérifier que package.json est bien copié
RUN ls -l /usr/src/app

# Installer les dépendances
RUN npm install

# Copier tous les fichiers restants
COPY . .

# Vérifier que tous les fichiers sont bien copiés
RUN ls -l /usr/src/app

# Exposer le port du serveur
EXPOSE 3000

# Démarrer le serveur Node.js
CMD ["node", "server.js"]