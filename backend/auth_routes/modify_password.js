const bcrypt = require('bcrypt')
const modifyPassword = (req,res,next) => {
    const saltRound = parseInt(process.env.MY_SALT)
    bcrypt.hash(req.body.password,saltRound,(err, hashedPassword)=>{
        if(err) {
            next(err);
        } else {
            req.body.password = hashedPassword;
            next();
        }
    })
}


module.exports = modifyPassword;