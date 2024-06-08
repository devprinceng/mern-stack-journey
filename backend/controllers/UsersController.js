//user model
const User = require('../model/User');
//initialize packages
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler')

//users controller
const usersController = {
    register: asyncHandler(async (req, res) => {
        //destructure request data
        const {username, email, password } = req.body;

        //validate
        if(!username || !email || !password){
            throw new Error('All fields are required');
        }

        //check if user exist
        const userExists = await User.findOne({ email })

        if(userExists) throw new Error('User Exist');

        //hash password
        const salt = await bcrypt.genSalt(10); // generate the salt

        //hash the password
        const hashedPassword = await bcrypt.hash(password, salt);

        //create the user
        const user = await User.create({
            username,
            email,
            password: hashedPassword
        });

        //send response of the new user created
        res.json({
            username: user.username,
            email: user.email,
            role: user.role,
            id: user._id
        })
    }),

}

module.exports = usersController;
