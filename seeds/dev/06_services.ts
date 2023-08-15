import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("Service").del();

    // Inserts seed entries
    await knex("Service").insert([
        {  name: "Automated Report",description :"provide you with quick access to relevant information", price : 11 },
        {  name: "Further assistance service and support material",description : "get additional assitance to do things for you", price : 15 },
        {  name: "Spanish Support",description : "expedite processes and provide you with the assistance you need", price : 19 },
       
        {  name: "Insight reports",description : "decision making has never been easier ", price : 19 },
        {  name: "Smart assistant",description : "delegate the configurations and upgrades to a team of FleetIQ experts, we know how busy you are", price : 19 },
        {  name: "DriverXQ",description : "you mantain continuous trainin of your drivers without effort", price : 19 },
        {  name: "Detailed audit trail",description : "you can ensure that your teams is using the security you invest in", price : 19 },
        
        {  name: "E-helpdesk",description : "System, 24/7 customer service that will improve efficiency", price : 19 },
        {  name: "Advanced driver behavior reporting",description : "Anticipate accidents with our", price : 19 },
        {  name: "External Suppliers",description : "get what you need just one click away to continue your operations", price : 19 },
        
        // {  name: "SELF-DRIVING",description : "TAILOR-MADE FOR ME", cost : 100 },

    ]);
};
