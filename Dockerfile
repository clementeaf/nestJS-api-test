FROM node:16 as install
LABEL stage=install

WORKDIR /src/install

COPY package.json .

RUN npm install

FROM node:16 as compile
LABEL stage=compile

WORKDIR /src/build

COPY --from=install /src/install .
COPY . .

RUN npm run build
RUN npm install --production=true

FROM node:16-alpine as deploy

WORKDIR /app

COPY --from=compile /src/build/dist/main.js index.js
COPY --from=compile /src/build/node_modules node_modules

ENTRYPOINT node .
