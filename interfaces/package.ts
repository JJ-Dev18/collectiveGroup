import { Service } from ".";


export interface Services {
    service: Service;
}

export interface Package {
    id:          number;
    name:        string;
    description: string;
    cost:        string;
    comments?:   string;
    createdAt:   Date;
    updatedAt:   null;
    services?:   Services[];
}
