const express = require('express');
const usersController = require('../controllers/UsersController'); //import the Users controller
const isAuthenticated = require('../middlewares/isAuthenticated');
//create the users router
const usersRouter = express.Router();

//register endpoint
usersRouter.post('/api/v1/users/register', usersController.register) //register
usersRouter.post('/api/v1/users/login', usersController.login) //login
usersRouter.get('/api/v1/users/profile', isAuthenticated, usersController.profile) //profile

module.exports = usersRouter;
