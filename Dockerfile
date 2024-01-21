# Estágio de construção
FROM node:20.11.0 as build

# RUN apt-get update && apt-get install -y postgresql-client

WORKDIR /usr/src/app

# Copie apenas os arquivos de configuração necessários
COPY package*.json ./
COPY tsconfig*.json ./

# Instale as dependências de produção
RUN npm install -g @nestjs/cli

RUN npm install --production

RUN npm run build

# Copie o código-fonte
COPY ./dist ./dist

# Estágio de produção
FROM node:20.11.0

RUN apt-get update && apt-get install -y postgresql-client

WORKDIR /usr/src/app

# Copie os arquivos necessários do estágio de construção
COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/package.json ./
COPY --from=build /usr/src/app/tsconfig*.json ./
COPY --from=build /usr/src/app/dist ./dist

# Exponha a porta do aplicativo, se necessário
EXPOSE 3333

# Defina a variável de ambiente NODE_ENV como "production"
ENV NODE_ENV=production

# Defina o comando de inicialização do aplicativo
CMD ["node", "dist/src/main.js"]

# RUN yarn install

# COPY . .

# EXPOSE 3333

# CMD ["npm", "start:prod"]
