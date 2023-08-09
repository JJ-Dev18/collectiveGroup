import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("SaleDetail").del();

    // Inserts seed entries
    await knex("SaleDetail").insert([
        { productId: 1, saleId: 1,quantity : 1,cost : 10, subtotal: 10 },
       
    ]);
};
