import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("BenefitOnProducts").del();

  // Inserts seed entries
  await knex("BenefitOnProducts").insert([
    { benefitId: '1', productId: '1' },
    { benefitId:'1', productId: '2' },
    
  ]);
}
