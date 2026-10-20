# Production build of the front served by nginx (issue #27)
FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY vite.config.js index.html eslint.config.js ./
COPY public ./public
COPY src ./src
# Vite puts VITE_* variables in the bundle while building, so the api address is a build argument
ARG VITE_API_HOST=http://localhost:3001/ms-logica-negocio/api
ENV VITE_API_HOST=$VITE_API_HOST
RUN npm run build

FROM nginx:1.27-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
