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
            // number date in month
            type: Number,
            required: true
        },
        eventMonth: {
            // 0 indexed; 0-11
            type: Number,
            required: true
        },
        eventTime: {
            type: String
        }
    }
);

const Event = model('Event', eventSchema);

module.exports = Event;