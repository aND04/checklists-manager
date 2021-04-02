FROM node:14.16-alpine AS builder

WORKDIR /usr/src/app

COPY . .

RUN npm install

RUN npm run build

FROM node:15.12-alpine

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/ .

CMD ["node", "dist/main"]
