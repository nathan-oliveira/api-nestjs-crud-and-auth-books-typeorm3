## Framework

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
yarn install
```

## Dependencies

```bash
yarn add class-transformer class-validator typeorm pg 
yarn add @nestjs/config 
yarn add @nestjs/typeorm @nestjs/mapped-types
yarn add @nestjs/swagger swagger-ui-express
yarn add bcrypt 
yarn add @types/bcrypt -D
yarn add @nestjs/passport passport passport-local 
yarn add @types/passport-local -D
yarn add @nestjs/jwt passport-jwt 
yarn add @types/passport-jwt -D
yarn add ioredis
yarn add @types/multer -D
yarn add tsconfig-paths -D
yarn upgrade
```

```
nest g resource modules/users --dry-run

nest g resource modules/users
```

## Docker (PostgreSQL & PgAdmin)

### Requirements

* docker >= 17.12.0+
* docker-compose
* node >= 18.17.1

# Command to give execution permission

```bash
chmod +x .docker/entrypoint.sh
chmod +x .docker/postgres/create-schema.sh
dos2unix .docker/postgres/create-schema.sh
docker-compose up -d
```

## TypeORM 3

```bash
## create migration
$ npm run migration:create nameMigration

## run migration
$ npm run migration:run

## revert migration
$ npm run migration:revert
$ npm run typeorm -- migration:show
$ npm run typeorm -- migration:revert --version=createColumnActiveModule1713469404233
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

* Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
* Website - [https://nestjs.com](https://nestjs.com/)
* Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
