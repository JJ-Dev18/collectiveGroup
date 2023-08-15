import { IService } from ".";


export interface Services {
    service: IService;
}

export interface IPackage {
    id:          number;
    name:        string;
    description: string;
    price:        number;
    comments?:   string;
    createdAt:   Date;
    updatedAt:   null;
    services?:   Services[];
}
