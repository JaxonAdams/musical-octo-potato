const { Schema, model } = require('mongoose');

const eventSchema = new Schema(
    {
        eventName: {
            type: String,
            required: true,
        },
        eventDetails: {
            type: String
        },
        eventDate: {
            type: Number,
            required: true
        },
        eventMonth: {
            type: String,
            required: true
        }
    }
);

const Event = model('Event', eventSchema);

module.exports = Event;