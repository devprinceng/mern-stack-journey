const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const courseSectionSchema = new Schema({
    sectionName: {type: String, required: true},    
    sectionsCompleted: {type: Array},
    estimatedTime: Number,
    isCompleted: {type: Boolean, default: false},
    user: { 
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
},
{
    timestamps:true,
}
);

// export the model
module.exports = mongoose.model('CourseSection', courseSectionSchema);