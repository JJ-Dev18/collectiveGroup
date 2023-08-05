import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema
    .createTable('User', function (table) {
        table.increments('id').primary();
        table.string('name', 255).notNullable();
        table.string('email', 255).notNullable().unique();
        table.string('hashedPassword', 255).notNullable();
        table.string('image', 255)
        table.timestamp('createdAt').defaultTo(knex.fn.now()).index();
        table.timestamp('updatedAt')
       
    })
    .createTable('Product', function (table) {
        table.increments('id').primary();
        table.string('name', 255).notNullable();
        table.decimal('cost').notNullable();
        table.timestamp('createdAt').defaultTo(knex.fn.now()).index();
        table.timestamp('updatedAt')

    }).createTable('Benefit', function (table) {
        table.increments('id').primary();
        table.string('name', 255).notNullable();
        table.string('description', 255).notNullable();
        table.timestamp('createdAt').defaultTo(knex.fn.now()).index();
        table.timestamp('updatedAt')
    }).createTable('BenefitOnProducts', function (table) {
        table.increments('id').primary();

        table.foreign("productId").references("id").inTable("Product")
        table.foreign("benefitId").references("id").inTable("Benefit")

    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema
    .dropTable("products")
    .dropTable("users");
}

