const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {type: String, required: true},
    email: {
        type: String,
        required: true
    },
    password: {type: String, required: true},
    role: {
        type: String,
        enum: ['admin', 'instructor','student'],
        default: 'student',
    },
    progress:[{
        courseId:{
            type:Schema.Types.ObjectId,
            ref: 'Course',
            required: true,
        },
        sections:[{
            sectionId: {
                type: Schema.Types.ObjectId,
                ref: "CourseSection",
                required: true,
            },
            status:{
                type: String,
                enum: ['Not started','In progress', 'Completed'],
                default: 'Not Started',
            }
        }]
    }],
    coursesCreated:[{type: Schema.Types.ObjectId, ref: 'Course'}],
    coursesApplied:[{type: Schema.Types.ObjectId, ref: 'Course'}],
    lastLogin: Date,
},
{
    timestamps:true,
}
);

// export the model
module.exports = mongoose.model('User', userSchema);