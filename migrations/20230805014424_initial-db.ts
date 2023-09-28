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
        table.integer('price').notNullable();
        table.string('currency', 255)
        table.string('brochure', 255)
        table.timestamp('createdAt').defaultTo(knex.fn.now()).index();
        table.timestamp('updatedAt')

    }).createTable('Benefit', function (table) {
        table.increments('id').primary();
        table.string('name', 255).notNullable();
        table.string('description', 255).notNullable();
        table.timestamp('createdAt').defaultTo(knex.fn.now()).index();
        table.timestamp('updatedAt')
    }).createTable('BenefitOnProducts', function (table) {
        
        table.integer('productId').unsigned()
        table.integer('benefitId').unsigned()
        table.unique(['productId', 'benefitId']);
    }).createTable("Service", function(table){
        table.increments('id').primary();
        table.string('name', 255).notNullable();
        table.string('description', 255).notNullable();
        table.integer('price').notNullable();
        table.timestamp('createdAt').defaultTo(knex.fn.now()).index();
        table.timestamp('updatedAt')
    })
    .createTable("Package", function(table){
        table.increments('id').primary();
        table.string('name', 255).notNullable();
        table.string('description', 255).notNullable();
        table.string('comments', 255).notNullable();
        table.string('currency', 255)
        table.integer('price').notNullable();
        table.timestamp('createdAt').defaultTo(knex.fn.now()).index();
        table.timestamp('updatedAt')
    })
    .createTable("ServiceOnPackage", function(table){
        
        table.integer('serviceId').unsigned()
        table.integer('packageId').unsigned()
        table.unique(['serviceId', 'packageId']);
    })
    .table("BenefitOnProducts", function(table){
        
        table.foreign("productId").references("id").inTable("Product")
        table.foreign("benefitId").references("id").inTable("Benefit")
    })
    .table("ServiceOnPackage", function(table){   
        table.foreign("serviceId").references("id").inTable("Service")
        table.foreign("packageId").references("id").inTable("Package")
    }).createTable('Sale', function(table){
        table.increments('id').primary();
        table.integer('clienteId').unsigned()
        table.string('shippingAddress', 255)
        table.string('paymentResult', 255)
        table.string('paidAt', 255)
        table.string('transactionId', 255)
        table.string('city', 255)
        table.string('country', 255)
        table.boolean('isPaid ').defaultTo(false)
        table.timestamp('createdAt').defaultTo(knex.fn.now()).index();      

    }).createTable('Subscription', function(table){
        table.increments('id').primary();
        table.integer('clienteId').unsigned()
        table.string('shippingAddress', 255)
        table.string('paymentResult', 255)
        table.string('paidAt', 255)
        table.string('transactionId', 255)
        table.string('city', 255)
        table.string('country', 255)
        table.boolean('isPaid ').defaultTo(false)
        table.timestamp('createdAt').defaultTo(knex.fn.now()).index();      

    })
    .createTable('SaleDetailProduct', function(table){
        table.increments('id').primary();
        table.integer('productId').unsigned()
        table.integer('saleId').unsigned()
        table.integer('quantity').notNullable();
        table.decimal('price').notNullable();
        table.decimal('subtotal').notNullable();
        table.timestamp('createdAt').defaultTo(knex.fn.now()).index();      
       

    }).createTable('SubscriptionDetailPackage', function(table){
        table.increments('id').primary();
        table.integer('packageId').unsigned()
        table.integer('subscriptionId').unsigned()
        table.integer('quantity').notNullable();
        table.decimal('price').notNullable();
        table.decimal('subtotal').notNullable();
        table.timestamp('createdAt').defaultTo(knex.fn.now()).index();          

    })
    .table('Sale', function(table){
        table.foreign("clienteId").references("id").inTable("User")
    })
    .table('Subscription', function(table){
        table.foreign("clienteId").references("id").inTable("User")
    })
    .table('SaleDetailProduct', function(table){
        table.foreign("productId").references("id").inTable("Product")
        table.foreign("saleId").references("id").inTable("Sale")

    })
    .table('SubscriptionDetailPackage', function(table){
        table.foreign("packageId").references("id").inTable("Package")
        table.foreign("subscriptionId").references("id").inTable("Subscription")


    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema
    .dropTable("BenefitOnProducts")
    .dropTable("SaleDetailProduct")
    .dropTable("SubscriptionDetailPackage")
    .dropTable("Subscription")
    .dropTable("Sale")
    .dropTable("Product")
    .dropTable("User")
    .dropTable("Benefit")
    .dropTable("ServiceOnPackage")
    .dropTable("Service")
    .dropTable("Package")

}

