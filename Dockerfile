FROM node:20

WORKDIR /app

COPY ./ /app

RUN npm install && npm run build

ENTRYPOINT [ "node", "-r", "dotenv/config", "build" ]
