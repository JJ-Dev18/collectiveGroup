
export interface IUser {

    _id: string;
    name : string;
    email : string;
    password? :string;
    role : string;

    createdAt? : string;
    updatedAt? : string;
}

// role            Role     @default(USER)
// name            String?
// email           String?   @unique
// emailVerified   DateTime?
// image           String?
// hashedPassword  String?
// createdAt       DateTime @default(now())
// updatedAt       DateTime? @updatedAt