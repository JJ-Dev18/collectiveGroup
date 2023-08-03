import { Knex } from 'knex';
require("dotenv").config({path: '.env.local'})

console.log(process.env.DATABASE_URL)

type DbEnvironments = 'development' |  'production'

const config: Record<DbEnvironments, Knex.Config> = {
  
  development: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    seeds: {
      directory: './seeds/dev'
   },
    migrations: {
      extension: 'ts',
    },
  },
  production: { 
    client: 'pg', 
    connection: process.env.DATABASE_URL,
    migrations: {
      extension: 'ts',
    },
  }

 
};

export default config;