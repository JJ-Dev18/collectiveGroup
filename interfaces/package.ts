import { IService } from ".";


export interface Services {
    service: IService;
}

export interface ItemInterface {
    id:          string;
    name:        string;
    description: string;
    price:        number;
    currency : string;
    comments?:   string;
    createdAt:   string;
    updatedAt:   null;
    services?:   Services[];
}


