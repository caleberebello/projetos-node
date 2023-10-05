FROM node:18
WORKDIR /usr/src/app
COPY ./01-ChatJS/package*.json ./
RUN npm install
COPY ./01-ChatJS .
EXPOSE 3000
CMD ["npm", "run", "dev"]