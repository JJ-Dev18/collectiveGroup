import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("Sale").del();

    // Inserts seed entries
    await knex("Sale").insert([
        { clienteId: 1, totalPrice : 20000 },
    ]);
};
