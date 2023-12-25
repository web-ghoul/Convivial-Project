const jwt = require('jsonwebtoken')


const authenticate = (req,res,next) => {

    try {
        
        console.log("from middleware")
        let cookieToken = req.cookies.token;
        
        //const token = req.headers.authorization.split(' ')[1]
        const decode = jwt.verify(cookieToken, process.env.SECRET_KEY);
        
        
        return next()


    }catch(error)
    {
        res.render('../view/login')
    }
    
}

module.exports = authenticate
