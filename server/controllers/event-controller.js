const router = require('express').Router();

const { Event } = require('../models');

router.get('/events', (req, res) => {
    Event.find({}).select('-__v')
    .then(dbEventData => res.json(dbEventData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;