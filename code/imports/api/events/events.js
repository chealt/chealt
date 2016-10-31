import { Mongo } from 'meteor/mongo';

export const Events = new Mongo.Collection('events');

Events.publicFields = {
    id: 1,
    location: 1,
    images: 1,
    guests: 1,
    host: 1,
    geocode: 1,
    minAttendance: 1,
    maxAttendance: 1,
    activityList: 1,
    start: 1,
    end: 1
};
