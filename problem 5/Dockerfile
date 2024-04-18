FROM node:18
RUN echo 'Runing dockerfile'
WORKDIR /app
COPY package*.json ./
COPY . .
RUN yarn

CMD [ "yarn","dev" ]
