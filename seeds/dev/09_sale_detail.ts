import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("SaleDetailProduct").del();

    // Inserts seed entries
    await knex("SaleDetailProduct").insert([
        { productId: 1,
             saleId: 1,
             quantity : 1,
             price : 10,
              subtotal: 10,

            
            
            
            },
       
    ]);
};
