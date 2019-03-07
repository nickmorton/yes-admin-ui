FROM node:alpine AS builder
RUN apk update && apk add --no-cache make git

WORKDIR /app

COPY package*.json /app/

RUN cd /app && npm ci
COPY .  /app

RUN cd /app && npm run build

FROM nginx:alpine

## Remove default nginx website and config
RUN rm -rf /usr/share/nginx/html/*
RUN rm /etc/nginx/conf.d/*

# Copy our content and config.
COPY --from=builder /app/dist /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
