FROM node:12

ENV PORT 4000

EXPOSE 4000

WORKDIR /usr/src/app

RUN git clone https://github.com/lkennxyz/cold-brew-alarm-api.git

WORKDIR /usr/src/app/cold-brew-alarm-api

RUN npm ci --only=production

CMD ["node", "index.js"]
