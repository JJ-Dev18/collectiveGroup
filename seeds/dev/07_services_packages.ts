import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("ServiceOnPackage").del();

    // Inserts seed entries
    await knex("ServiceOnPackage").insert([
        { serviceId: '1', packageId: '1' },
       { serviceId:'2', packageId: '1' },
       { serviceId:'3', packageId: '1' },

       { serviceId:'4', packageId: '2' },
       { serviceId:'5', packageId: '2' },
       { serviceId:'6', packageId: '2' },
       { serviceId:'7', packageId: '2' },

       { serviceId:'8', packageId: '3' },
       { serviceId:'9', packageId: '3' },
       { serviceId:'10', packageId: '3' },



    ]);
};
