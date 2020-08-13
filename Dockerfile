FROM node:12

WORKDIR /app

COPY . .

EXPOSE 5000

RUN yarn

ENTRYPOINT ["yarn","start"]