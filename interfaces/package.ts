import { Benefits, IService } from ".";


export interface Services {
    service: IService;
}

export interface ItemInterface {
    id:          string;
    name:        string;
    description?: string;
    price:        number;
    currency? : string;
    comments?:   string;
    createdAt:   string;
    updatedAt?:   null;
    benefits? :  Benefits[]
    services?:   Services[];
}


