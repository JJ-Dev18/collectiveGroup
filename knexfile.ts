import { Knex } from 'knex';
require("dotenv").config({path: '.env.local'})


type DbEnvironments = 'development' |  'production'

const config: Record<DbEnvironments, Knex.Config> = {
  
  development: {
    client: 'pg',
    connection: {
      connectionString : process.env.DATABASE_URL,
      ssl:{
        rejectUnauthorized : false 
      }
    },
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