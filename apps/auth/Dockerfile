FROM node:20-alpine As development

# Set the working directory inside the container
WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./
COPY nest-cli.json nest-cli.json


RUN npm install yarn

RUN yarn install

# Copy the rest of the application code to the working directory
COPY . .

# Build the application
RUN yarn run build

# Production image
FROM node:20-alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./

RUN npm install yarn

RUN yarn install --production

COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/apps/auth/main"]