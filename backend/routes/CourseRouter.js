const express = require('express');

const courseController = require('../controllers/CourseController'); //import the course controller
const isAuthenticated = require('../middlewares/isAuthenticated');
//create the users router
const courseRouter = express.Router();

//route endpoints
courseRouter.post('/api/v1/courses/create', isAuthenticated, courseController.create) //create course route

module.exports = courseRouter;
