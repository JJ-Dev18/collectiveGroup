export interface IService {
    id:          number;
    name:        string;
    description: string;
    price:        number;
    createdAt?:   Date;
    updatedAt?:   null;
}
