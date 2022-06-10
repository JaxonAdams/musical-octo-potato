const router = require('express').Router();

const eventController = require('./event-controller');

router.use('/api', eventController);

module.exports = router;