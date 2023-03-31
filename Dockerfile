FROM node:12-alpine3.15

RUN mkdir -p /var/www/TropicalMitch
WORKDIR /var/www/TropicalMitch

COPY . /var/www/TropicalMitch
COPY package.json /var/www/TropicalMitch

RUN npm install

CMD [ "sleep","240" ]
CMD [ "npm","start" ]