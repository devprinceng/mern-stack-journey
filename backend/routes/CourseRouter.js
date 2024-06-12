const express = require('express');

const courseController = require('../controllers/CourseController'); //import the course controller
const isAuthenticated = require('../middlewares/isAuthenticated');
//create the users router
const courseRouter = express.Router();

//route endpoints
courseRouter.post('/api/v1/courses/create', isAuthenticated, courseController.create) //create course route
courseRouter.get('/api/v1/courses/lists', courseController.list) //course lists
courseRouter.get('/api/v1/courses/:courseId', courseController.getCourseById) //find ourse by ID
courseRouter.put('/api/v1/courses/:courseId', courseController.update) //find ourse by ID

module.exports = courseRouter;
