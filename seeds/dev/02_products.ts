import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("Product").del();

    // Inserts seed entries
    await knex("Product").insert([
        {  name: "Fleet IQ360", price : 120 },
        {  name: "Forklift IQ360", price : 200 },
        {  name: "Rental IQ", price : 200 },

    ]);
};
