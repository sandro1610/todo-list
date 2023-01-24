FROM node:16-alpine
# Installing libvips-dev for sharp Compatability
# RUN apt-get update && apt-get install libvips-dev -y
#ARG NODE_ENV=development
#ENV NODE_ENV=${NODE_ENV}
WORKDIR /app
COPY ./package.json  .
ENV PATH /app/node_modules/.bin:$PATH
RUN npm install
COPY . .
EXPOSE 3030
CMD ["node", "app.js"]
