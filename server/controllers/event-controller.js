const router = require('express').Router();

const { Event } = require('../models');

// get all events
router.get('/events', (req, res) => {
    Event.find({}).select('-__v')
    .then(dbEventData => res.json(dbEventData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// get event by ID
router.get('/events/:id', ({ params }, res) => {
    Event.findOne({ _id: params.id }).select('-__v')
    .then(dbEventData => {
        if (!dbEventData) {
            return res.status(404).json({ message: 'Event not found.' });
        }
        res.json(dbEventData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// update event
router.put('/events/:id', ({ params, body }, res) => {
    Event.findOneAndUpdate(
        { _id: params.id },
        body,
        { new: true, runValidators: true }
    )
    .then(dbEventData => {
        if (!dbEventData) {
            return res.status(404).json({ message: 'Event not found.' });
        }
        res.json(dbEventData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// add event
router.post('/events', ({ body }, res) => {
    Event.create(body)
    .then(dbEventData => res.json(dbEventData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// delete event
router.delete('/events/:id', ({ params }, res) => {
    Event.findOneAndDelete({ _id: params.id })
    .then(dbEventData => {
        if (!dbEventData) {
            return res.status(404).json({ message: 'Event not found.' });
        }
        res.json(dbEventData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;