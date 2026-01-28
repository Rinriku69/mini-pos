FROM node:22 as build-step

WORKDIR /app

COPY package.json .
RUN npm install

COPY . .
RUN npm run build

FROM nginx:alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build-step /app/dist/mini-pos/browser /usr/share/nginx/html

EXPOSE 80