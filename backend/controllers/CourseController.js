//user model
const User = require('../model/User');
const Course = require('../model/Course');
//initialize packages
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')

//users controller
const courseController = {
    // create course
    create: asyncHandler(async (req, res) => {
        //request data
        const {title, description, difficulty, duration} = req.body;
       // find user
       const user = await User.findById(req.user);

       if(!user){
        res.status(404)
        throw new Error('User not Found')
       }
       
       //check if user is an instructor
    //    if(user.role !== 'instructor'){
    //     res.status(401)
    //     throw new Error("You're not authorized to create a course");
    //    }
       // validate user input
        if(!title || !description || !difficulty || !duration){
            throw new Error('All Fields are required');
        }
       // check if course exist
       const courseExists = await Course.findOne({title});
       if(courseExists){
        res.status(401);
        throw new Error('Course Already Exist');
       }

       //create course
       const course = await Course.create({
        title,
        description,
        difficulty,
        duration,
        user: req.user,
       });

       //! push the course into courseCreated array
       user.coursesCreated.push(course._id);
       //send the response
       res.status(201)
       res.json({ course });
    })
}

module.exports = courseController;
