const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const courseSchema = new Schema({
    title: {type: String, required: true},
    description: {
        type: String
    },
    difficulty: {type: String, required: true},
    duration: {type: String, required: true},
    
    sections:[{ type:Schema.Types.ObjectId, ref: 'CourseSection' }],
    user:[{ type:Schema.Types.ObjectId, ref: 'User' }], // user can be student, instructor, depending on the role
    students:[{type: Schema.Types.ObjectId, ref: 'User'}],
},
{
    timestamps:true,
}
);

// export the model
module.exports = mongoose.model('Course', courseSchema);