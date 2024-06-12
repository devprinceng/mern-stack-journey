//initialize packages
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const User = require('../model/User');
const Course = require('../model/Course');
const mongoose = require('mongoose');
const CourseSection = require('../model/CourseSection');


//users controller
const courseSectionController = {
    // create course
    create: asyncHandler(async (req, res) => {
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

    //get the sectionName
    const {sectionName} = req.body;
    // get the course id
    const { courseId } = req.params;
    // validate the course id
    if(!mongoose.isValidObjectId(courseId)){
        throw new Error('Invalid course id');
    }

        // find course
        const course = await Course.findById(courseId);
        if(!course){
        res.status(404);
        throw new Error('Course not found');
        }
        // validate section name
        if(!sectionName){
            throw new Error('Provide section name');
        }

        //create course sections
        const section = await CourseSection.create({
        sectionName,
        user: req.user
        });

       //! push the section name into the course
       course.sections.push(section._id);
       //send the response
       res.status(201)
       res.json({ course });

       //! save course
        await course.save();

        res.json({
            message: "Section created successfully",
            data: section,
            status: "success"
        });
    }),
    //! llist course sections
    lists: asyncHandler(async (req, res) => {
        sections = await CourseSection.find();

        res.json(sections);
    }),

    //get single course section
    single: asyncHandler(async (req, res) => {
        const section = await CourseSection.findById(req.params.sectionId)
        
        res.json(section);
    }),
    // update section
    update: asyncHandler(async (req, res) => {
        const section = await CourseSection.findByIdAndUpdate(
            req.params.sectionId,
            req.body,
            { new: true },
        );

        if(!section){
            res.status(404);
            throw new Error('Section not found')
        }
        
        res.json(section);
    }),
    //delete section
    delete: asyncHandler( async (req, res) => {
        //! find the section to be deleted
        const section = await CourseSection.findById(req.params.sectionId)
        if(!section){
            res.status(404);
            res.json({
                "message": "Section not Found"
            });

            return;
        }
        //! find the courses associated with the section to check for enrolled 
        const course = await Course.findOne({
            sections: req.params.sectionId
        }).populate("students");
        if(!course){
            res.status(404).json({message: "Associated course not Found" })
        }
        //! check if the course has any students enrolled 
        if(course.students.length > 0){
            res.status(400).json({
                message: "Course has students, cannot delete section",
            });
        }
        //! proceed to delete
        await CourseSection.findByIdAndDelete(req.params.sectionId);
        //! remove the section from the course section array
        await Course.findByIdAndUpdate(Course._id, {
            $pull: {sections: req.params.sectionId}
        });

        res.json({
            message: "Section deleted successfully"
        })
    })
}

module.exports = courseSectionController;
