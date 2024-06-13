const asyncHandler = require('express-async-handler');
const User = require('../model/User');
const Course = require('../model/Course');

const progressController = {
    //* enroll to a course
    enrollToCourse: asyncHandler(async (req, res) =>{
        
        const userId = req.user;
        const {courseId} = req.body;
        //*find user
        const user = await User.findById(userId)
        if(!user){
            res.status(404).json({message: "User not found"});
        }
        //* check if the user is already enrolled in the course
        const isUserEnrolled = user.progress.some((progress) => progress.courseId.toString() === courseId.toString());
        if(isUserEnrolled){
            return res.status(400).json({message: "You have already enrolled on this course"});
        }
        //*validate the course
        const course = await Course.findById(courseId);
        if(!course){
            res.status(404).json({message: "Course not found"});
        }
        //* add the course to user's progress
        user.progress.push({courseId, sections: []})
        //save user
        await user.save();
        //* push the user to the course
        course.students.push(userId);
        //* save course
        await course.save();
        res.status(200).json({message: "Course enrollment Successful", data: course});
    })
}

module.exports = progressController;