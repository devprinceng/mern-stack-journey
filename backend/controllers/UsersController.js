//user model
const User = require('../model/User');
//initialize packages
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')

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

    //login method
    login: asyncHandler (async (req, res ) => {
        //get data
        const {email, password } = req.body;
        //check if user exist
        const user = await User.findOne({email});
        if(!user) throw new Error('Email or Password does not exitst');

        //check if password matches
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            throw new Error('Email or Password does not exists')
        }
    
        // generate token
        const token = jwt.sign({id:user._id}, process.env.JWT_SECRET_KEY, {expiresIn:'7d'}) //generate token with unique user id
        res.json({
            "message": 'logged in successfully',
            "token": token,
            "email": user.email,
            id: user._id
        })
    })
}

module.exports = usersController;
