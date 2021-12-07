const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const secret = process.env.COOKIE_SECRET;

const authorize = (req,res,next) => {
        //  console.log(secret);
        //  console.log("hii");
        if (req.originalUrl === '/' || req.originalUrl === '/v1/register' || req.originalUrl === '/v1/login'){
            next();
        } else {
            // const token = req.body.token || req.query.token || req.headers['x-access-token'] || req.cookies.token || req.headers['authorization'];
            const token = req.headers['x-access-token'] || req.cookies.token || req.headers['authorization'];
            // console.log(token,"token");
            if (!token) {
                res.status(401).send('Unauthorized: No token presents!')
            } else {
                jwt.verify(token,secret, (err, decoded) => {
                   if(err) {
                       res.status(401).send('Unauthorized: Invalid token')
                   } else{
                       req.email = decoded.email;
                       console.log(decoded,"decoded");
                       next();
                   }
                })
            }
        }
        

        //  next();
}



module.exports = authorize;