import { Knex } from 'knex';
require("dotenv").config({path: '.env.local'})

console.log(process.env.DATABASE_URL)


const config: Knex.Config = {
  client: 'pg',
  connection: process.env.DATABASE_URL,
  migrations: {
    extension: 'ts',
  },
};

export default config;