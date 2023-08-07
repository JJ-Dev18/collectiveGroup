import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("Benefit").del();

    // Inserts seed entries
    await knex("Benefit").insert([
        { name: "Access control", description : 'Rigth Driver, right truck, right license' },
        { name: "Pre-operational Safety Checks", description : 'Customizable questions and critical questions lockouts' },
        { name: "Impact Reporting", description : 'Reduce damage and maintenance costs' },
        { name: "Operator Productivity", description : 'Track vehicle/driver sessions and seat, traction and hydraulic  activity' },
        { name: "Fleet Optimization", description : 'Indetify under utilized equipment' },
        { name: "Real-time 24/7 Vehicle Reporting", description : 'Live dashboards and alert/reports subscriptions.' },
        { name: "Service Alerts", description : 'Scheduled maintenance intervals (time or operational hours)' },
        { name: "Operation License Management", description : 'License expiry and truck access restriction.' },
        { name: "GPS Tracking", description : 'Know where your fleet is' },
        { name: "3G/4G Connectivity", description : 'Connects direct to the mobile network' },
        { name: "Rugged", description : 'IP65 rating and down to to -30°C operation' },
        { name: "Scalable", description : ' Able to accommodate fleets of all sizes.' },
        { name: "Simple & Cost Effective", description : 'Real solutions for dealers' },
        { name: "Reduced Maintenance Costs & TCO", description : 'Smarter scheduling of PMs' },
        { name: "More Profitable Rental Contracts", description : 'Automate & track rentals' },
        { name: "Increased Security Of Equipment", description : ' GPS location tracking' },
        { name: "Actionable Insights", description : 'Dashboards, emails & more' },  
    ]);
};
