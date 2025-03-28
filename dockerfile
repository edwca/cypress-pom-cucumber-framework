FROM cypress/browsers:node-18.12.0-chrome-106

WORKDIR /app

COPY . .

RUN npm install

CMD ["npm", "run", "test:qa"]
