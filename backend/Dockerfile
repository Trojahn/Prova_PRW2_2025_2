FROM node:22-slim

WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .

# Instala o sqlite3 CLI para manipular o banco
RUN apt-get update && apt-get install -y sqlite3

# Cria o banco vazio e popula com dados iniciais
RUN sqlite3 db.sqlite < init.sql

EXPOSE 3000
CMD ["npm", "start"]
