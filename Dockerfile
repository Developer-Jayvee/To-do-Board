# FROM node:22-alpine AS development-dependencies-env
# WORKDIR /app
# COPY . /app
# RUN npm install

# FROM node:22-alpine AS production-dependencies-env
# COPY ./package.json package-lock.json /app/
# WORKDIR /app
# RUN npm ci --omit=dev

# FROM node:22-alpine AS build-env
# COPY . /app/
# COPY --from=development-dependencies-env /app/node_modules /app/node_modules
# WORKDIR /app
# RUN npm run build

# FROM node:22-alpine
# COPY ./package.json package-lock.json /app/
# COPY --from=production-dependencies-env /app/node_modules /app/node_modules
# COPY --from=build-env /app/build /app/build
# WORKDIR /app

# EXPOSE 5173
# CMD ["npm", "run", "start","--host=0.0.0.0","--port=5173"]

FROM node:22-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]