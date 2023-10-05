FROM node:18
WORKDIR /usr/src/app
COPY ./ChatJS/package*.json ./
RUN npm install
COPY ./ChatJS .
EXPOSE 3000
CMD ["npm", "run", "dev"]