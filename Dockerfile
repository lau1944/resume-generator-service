FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

EXPOSE 50012
CMD [ "npm", "start" ]