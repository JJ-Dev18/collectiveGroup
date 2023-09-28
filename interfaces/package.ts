import { Benefits, IService } from ".";


export interface Services {
    service: IService;
}
export interface IPackage {
    id:          number;
    name:        string;
    description?: string;
    price:        number;
    currency? : string;
    comments?:   string;
    createdAt:   string;
    updatedAt?:   null;
    services?:   IService[];
}

export interface ItemInterface {
    id:          string;
    name:        string;
    description?: string;
    price:        number;
    currency? : string;
    brochure? : string;
    comments?:   string;
    createdAt:   string;
    updatedAt?:   null;
    benefits? :  Benefits[]
    services?:   Services[];
}


