import { Knex } from "knex";
const bcrypt = require('bcrypt');

const hash = bcrypt.hashSync('123456', 2);

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("User").del();

    // Inserts seed entries
    await knex("User").insert([
        { role: "USER",name: 'Juan', email: 'admin@google.com', hashedPassword: hash,},
    ]);
};


// role            Role     @default(USER)
//   name            String?
//   email           String?   @unique
//   emailVerified   DateTime?
//   image           String?
//   hashedPassword  String?
//   createdAt       DateTime @default(now())
//   updatedAt       DateTime @updatedAt