import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('User', (table) => {
        table.increments('id').primary();
        table.string('role',10).notNullable().defaultTo('USER');
        table.string('name', 255).notNullable();
        table.string('image', 255);
        table.string('email', 255).unique().notNullable();
        table.dateTime('emailVerified');
        table.string('hashedPassword', 255).notNullable();
        table.timestamp('createdAt').notNullable().defaultTo(knex.fn.now());
        table.timestamp('updatedAt')
      });
}
// role            Role     @default(USER)
//   name            String?
//   email           String?   @unique
//   emailVerified   DateTime?
//   image           String?
//   hashedPassword  String?
//   createdAt       DateTime @default(now())
//   updatedAt       DateTime @updatedAt

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('User');
}

