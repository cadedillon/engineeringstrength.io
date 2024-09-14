# Frontend Dockerfile
FROM node:18 as build

WORKDIR /app

COPY package.json ./
RUN npm install

COPY . .

ARG REACT_APP_IS_PROD
ENV REACT_APP_IS_PROD=${REACT_APP_IS_PROD}

RUN npm run build

FROM nginx:alpine

# Copy custom Nginx config
COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]