const {createAccountController} = require('../controllers/accountController');

const express = require('express');

const router = express.Router();

router.post('/account', createAccountController);

module.exports = router; 