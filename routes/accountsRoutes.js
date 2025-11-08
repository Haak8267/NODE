const {createAccountController} = require('../controller/accountController');

const express = require('express');

const router = express.Router();

router.post('/account', createAccountController);

module.exports = router; 