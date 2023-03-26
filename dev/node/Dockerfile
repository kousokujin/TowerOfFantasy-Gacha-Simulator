FROM node:16.19.1

ENV NODE_ENV=development

RUN apt-get update && \
    apt-get install -y bash curl git

RUN npm install -g @vue/cli

WORKDIR /usr/var/app