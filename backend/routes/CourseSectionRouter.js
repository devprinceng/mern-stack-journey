const express = require('express');
const courseSectionController = require('../controllers/CourseSectionController');
const isAuthenticated = require('../middlewares/isAuthenticated');
const courseSectionRouter = express.Router();

courseSectionRouter.post('/api/v1/course-sections/create/:courseId', isAuthenticated, courseSectionController.create);
courseSectionRouter.get('/api/v1/course-sections/lists', courseSectionController.lists);
courseSectionRouter.get('/api/v1/course-sections/:sectionId', courseSectionController.single);
courseSectionRouter.put('/api/v1/course-sections/:sectionId', courseSectionController.update);
courseSectionRouter.delete('/api/v1/course-sections/:sectionId', courseSectionController.delete);

module.exports = courseSectionRouter;
