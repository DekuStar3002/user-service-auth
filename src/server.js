const userRoute = require('./route/user');
const router = require('express').Router();
router.use('/user', userRoute);

module.exports = router;