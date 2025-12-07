FROM node:24-alpine
WORKDIR /usr/app
COPY package*.json ./
RUN npm install 
COPY ./ ./

COPY ./prisma ./prisma
RUN npx prisma generate

EXPOSE ${PORT}

# CMD ["npm","run", "start:dev"]
CMD ["sh", "-c", "npx prisma migrate deploy && npm run start:dev"]


