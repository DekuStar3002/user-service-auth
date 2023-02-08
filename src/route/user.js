const router = require('express').Router();
const userController = require('../controller/user');
router.route('/save')
.post(userController.createUser);

router.route('/token')
.post(userController.loginUser);

router.route('/validation')
.get(userController.validateUser);

module.exports = router;