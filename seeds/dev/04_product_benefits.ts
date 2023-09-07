import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("BenefitOnProducts").del();

  // Inserts seed entries
  await knex("BenefitOnProducts").insert([
    { benefitId: '1', productId: '1' },
    { benefitId: '2', productId: '1' },
    { benefitId: '3', productId: '1' },
    { benefitId: '4', productId: '1' },
    { benefitId: '5', productId: '1' },
    { benefitId: '6', productId: '1' },
    { benefitId: '7', productId: '1' },
    { benefitId: '8', productId: '1' },
    { benefitId: '9', productId: '1' },
    { benefitId: '10', productId: '1' },
    { benefitId: '11', productId: '1' },
    { benefitId: '12', productId: '1' },



    { benefitId:'1', productId: '2' },
    { benefitId:'2', productId: '2' },
    { benefitId:'3', productId: '2' },
    { benefitId:'4', productId: '2' },
    { benefitId:'5', productId: '2' },
    { benefitId:'6', productId: '2' },
    { benefitId:'7', productId: '2' },
    { benefitId:'8', productId: '2' },
    { benefitId:'9', productId: '2' },
    { benefitId:'10', productId: '2' },
    { benefitId:'11', productId: '2' },

    { benefitId:'5', productId: '3' },
    { benefitId:'6', productId: '3' },
    { benefitId:'7', productId: '3' },
    { benefitId:'9', productId: '3' },
    { benefitId:'10', productId: '3' },
    { benefitId:'13', productId: '3' },
    { benefitId:'14', productId: '3' },
    { benefitId:'15', productId: '3' },
    { benefitId:'16', productId: '3' },
    { benefitId:'17', productId: '3' },





    
  ]);
}
