import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema
    .createTable('User', function (table) {
        table.increments('id').primary();
        table.string('name', 255).notNullable();
        table.enu('role', ['USER', 'ADMIN']).defaultTo("USER")
        table.string('email', 255).notNullable().unique();
        table.datetime('emailVerified')
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
        table.integer('productId').unsigned()
        table.integer('benefitId').unsigned()
    }).createTable("Service", function(table){
        table.increments('id').primary();
        table.string('name', 255).notNullable();
        table.string('description', 255).notNullable();
        table.decimal('cost').notNullable();
        table.timestamp('createdAt').defaultTo(knex.fn.now()).index();
        table.timestamp('updatedAt')
    })
    .createTable("Package", function(table){
        table.increments('id').primary();
        table.string('name', 255).notNullable();
        table.string('description', 255).notNullable();
        table.string('comments', 255).notNullable();
        table.decimal('cost').notNullable();
        table.timestamp('createdAt').defaultTo(knex.fn.now()).index();
        table.timestamp('updatedAt')
    })
    .createTable("ServiceOnPackage", function(table){
        table.increments('id').primary();
        table.integer('serviceId').unsigned()
        table.integer('packageId').unsigned()
    })
    .table("BenefitOnProducts", function(table){
        
        table.foreign("productId").references("id").inTable("Product")
        table.foreign("benefitId").references("id").inTable("Benefit")
    })
    .table("ServiceOnPackage", function(table){   
        table.foreign("serviceId").references("id").inTable("Service")
        table.foreign("packageId").references("id").inTable("Package")
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema
    .dropTable("BenefitOnProducts")
    .dropTable("Product")
    .dropTable("User")
    .dropTable("Benefit")
    .dropTable("ServiceOnPackage")
    .dropTable("Service")
    .dropTable("Package");
}

