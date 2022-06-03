FROM node:16 AS Builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm", "run", "build"]

FROM nginx:alpine

WORKDIR /usr/share/nginx/html

RUN rm -rf ./*

COPY --from=builder /app/build /usr/share/nginx/html
COPY ./Docker/nginx.conf /etc/nginx/conf.d/default.conf