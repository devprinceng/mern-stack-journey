//user model
const User = require('../model/User');
const Course = require('../model/Course');
require('../model/CourseSection');
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

       //save the user object
       await user.save();

       //send the response
       res.status(201)
       res.json({ course });
    }),

    //list all courses
    list: asyncHandler(async (req, res) => {
        const courses = await Course.find()
            .populate('sections')
            .populate({
                path: 'user',
                model: "User",
                select: "username email",
            });

        res.json(courses);
    }),
    // find single course
    getCourseById: asyncHandler(async (req, res) => {
        const course = await Course.findById(req.params.courseId).populate('sections')
        
        res.json(course);
    }),
    //update course method
    update: asyncHandler( async (req, res) => {
        //find and update course
        const course = await Course.findByIdAndUpdate(req.params.courseId, req.body, {new:true});
        
        if(course){
            res.json(course)
        }
        else{
            res.status(404);
            throw new Error('Course not Found');
        }
    }),
    //delete method
    delete: asyncHandler(async (req, res) => {

        //* find the course
        const course = await Course.findById(req.params.courseId);
        console.log(course);
        //!prevent deletion if a course has students
        if(course && course.students.length > 0){
            res.status(404);
            res.json({message: "Course has Students, cannot delete"});
            return;// stop execution
        }
        //find and delete course
        const course_deleted = await Course.findByIdAndDelete(req.params.courseId);
        if(course_deleted){
            //* remove the course from User (coursesCreated field) model
            await User.updateMany({coursesCreated: req.params.courseId},
                {
                    $pull: {coursesCreated: req.params.courseId},
                }
            );
            
            //! send the response
            res.json({
                message: "Course deleted successfully",
                data: course_deleted
            })
        }else{
            res.json({message: "Course not Found"});
        }
    })

}

module.exports = courseController;
