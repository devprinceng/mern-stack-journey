const jwt = require('jsonwebtoken')

const isAuthenticated = async (req, res, next) =>{
   //! get the request header
    reqHeaders = req.headers;
    //! get the token
    const token = reqHeaders?.authorization?.split(' ')[1]
    //! verify token
    const verifyToken =  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
        if (err){
            return false;
        }        
        return decoded
    });

    if(verifyToken){
        //! save user id to request id
        req.user = verifyToken.id;
        //! go to requested route if authenticated
        next()
    }
    else{
        const err = new Error('Token Expired, Please login again')

        next(err)
    }
}

module.exports = isAuthenticated
