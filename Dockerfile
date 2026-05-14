FROM mcr.microsoft.com/playwright:v1.59.1-noble

WORKDIR /app

ENV CI=true

COPY package*.json ./
RUN npm ci

COPY . .

CMD ["npm", "test"]
