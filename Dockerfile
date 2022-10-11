FROM node:14.15.4
ENV PORT 3000
EXPOSE 3000

WORKDIR /usr/src/app
COPY src/package*.json ./
RUN npm install
COPY src/. .
RUN npm run build # Build next framework


CMD ["npm", "start"]
