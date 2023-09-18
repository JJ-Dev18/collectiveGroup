import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("Product").del();

    // Inserts seed entries
    await knex("Product").insert([
        {  name: "Fleet IQ360", price : 120, currency : 'usd', brochure : 'https://drive.google.com/file/d/1y-nFV_J_TvC0fhA2Ziha1ttQ8EArRiUN/view' },
        {  name: "Forklift IQ360", price : 200 ,currency : 'usd',brochure : 'https://drive.google.com/file/d/1IdkUn5kMv_qS_96Ug_0tGpTNI9sMxVZ5/view'  },
        {  name: "Rental IQ", price : 200 ,currency : 'usd',brochure : 'https://drive.google.com/file/d/1fRlXJ9xdf2iwF61ua3TUZoKT2ffx9Y7z/view' },

    ]);
};
