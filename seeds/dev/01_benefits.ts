import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("Benefit").del();

    // Inserts seed entries
    await knex("Benefit").insert([
        { name: "Access control", description : 'Rigth Driver, right truck, right license' },
        { name: "Pre-operational Safety Checks", description : 'Customizable questions and critical questions lockouts' },
        { name: "Impact Reporting", description : 'Reduce damage and maintenance costs' },
        { name: "Operator Productivity", description : 'Track vehicle/driver sessions and seat, traction and hydraulic  activity' },
        { name: "Fleet Optimization", description : 'Indetify under utilized equipment' },
       
    ]);
};
