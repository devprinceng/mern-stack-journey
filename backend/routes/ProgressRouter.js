const express = require('express');

const progressController = require('../controllers/ProgressController'); //import the progress controller
const isAuthenticated = require('../middlewares/isAuthenticated');
//create the users router
const progressRouter = express.Router();

//route endpoints
progressRouter.post('/api/v1/progress/enroll/', isAuthenticated, progressController.enrollToCourse) //create progress route


module.exports = progressRouter;
