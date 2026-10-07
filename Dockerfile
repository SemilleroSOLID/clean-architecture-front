FROM node:20 AS builder
WORKDIR /app
COPY package*.json ./
COPY vite.config.js ./ 
COPY index.html ./
RUN npm install
COPY src ./src
COPY public ./public
COPY .env.example .env

FROM node:20
WORKDIR /app
COPY --from=builder /app /app
EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--host"]