import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("Package").del();

    // Inserts seed entries
    await knex("Package").insert([
        {  name: "SAVER",description :"SAVE ME TIME", cost : 11 , comments: ''},
        {  name: "MANAGE",description : "ISSUES AND OPTIONS", cost : 15 ,comments : 'All services included in the SAVER package'},
        {  name: "PROACTIVE",description : "ENGAGEMENT AND TEAMS", cost : 19 , comments : 'All services included in the SAVER & Manage package' },

        // {  name: "SELF-DRIVING",description : "TAILOR-MADE FOR ME", cost : 100 },
    ]);
};
