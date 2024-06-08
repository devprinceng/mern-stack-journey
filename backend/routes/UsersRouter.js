const express = require('express');
const usersController = require('../controllers/UsersController'); //import the Users controller
//create the users router
const usersRouter = express.Router();

//register endpoint
usersRouter.post('/api/v1/users/register', usersController.register)

module.exports = usersRouter;