# ABC

### Configuration

`.env` file is required, check `.env.example`

### Installation

`npm install`

### Before running

Run migration to create adming user
`npm run migrate:up`

### Running

`npm run start:dev`

### API

Open `localhost:3000/api` to see OpenApi (swagger)

#### Docker

There is a `docker-compose.yml` and `Dockerfile` file for starting Docker.

`docker-compose up dev` for dev env

`docker-compose up prod` for prod env
