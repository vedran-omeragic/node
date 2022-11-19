# About the project

Server app made using Node.js / Typescript

Project uses:

**Express** - for building RESTful API routes
**express-validator** - to validate request payloads using pre-defined schemas
**Morgan** - for loging incoming requests and responses
**Prisma** - ORM to make managing queries easier
**ESLint, Prettier and Husky** - to make devs life easier
**nodemon** - to track changes and automatically restart the app
**bcrypt** - for encrypting passwords
**dotenv** - for managing ENV variables
**lodash** - to extract stuff without linter screaming at you

## Requirements

- Node v16
- Npm v9
- Docker and docker-compose

# Installation

1. Navigate to the root folder and run `npm i` to install all dependencies
2. Run `docker-compose up -d` to initiate postgres (Make sure port 5432 is available)
3. Run `npx prisma generate` to generate modules for Prisma ORM Client
4. Run `npx prisma migrate deploy` to run migrations
5. Run `npx prisma db seed` to seed table with dummy data
6. Finally run either `npm start` to create a build version, or `npm run dev` to start the app in dev environment
