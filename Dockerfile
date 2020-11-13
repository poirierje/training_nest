# Create a first image to build distribution files
FROM node:12.13-alpine AS development
WORKDIR /usr/src/app

# Copy package JSON files and launch the node install
COPY package*.json ./
RUN npm install --only=development

# Copy source files (must be done after npm install so Docker will not create sublayer for each file modification)
COPY . .

# Run node app
RUN npm run build



# Create a new, fresh image, without any connection to the previous one
FROM node:12.13-alpine AS production
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
WORKDIR /usr/src/app

# Copy package JSON files and launch the node install
COPY package*.json ./
RUN npm install --only=production

# Copy source files (must be done after npm install so Docker will not create sublayer for each file modification)
COPY . .

# Add distribution files
COPY --from=development /usr/src/app/dist ./dist

# Add bash
RUN apk add --no-cache bash

# Expose network port 3000
EXPOSE 3000

# Launch the server in production mode
CMD ["npm", "run", "start:prod"]
