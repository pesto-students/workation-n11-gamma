
const Route = require('express').Router()
const bcrypt = require('bcrypt');
const modifyPassword = require("./modify_password")
const Users = require("../database/config"); 
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const dotenv = require('dotenv')
dotenv.config();
const secret = process.env.COOKIE_SECRET;


// Route.post("/register",modifyPassword, async (req,res)=>{
//     const {email,password} = req.body;
//     const alreaydExists = await
//           Users.where('email', '=', email).get();
//     if(alreaydExists._size){
//          res.status(401).json({
//              error: 'Email Already Present'
//          })
//     } else {
//         await Users.doc(uuidv4()).set(req.body);
//      res.status(200).send('Welcome to the Project!');
//     }
// });

Route.post('/signup',modifyPassword, async (req, res) => {  
    console.log(req.body);
    const isCorrectPassword = function(password,thisPassword, callback) {
        bcrypt.compare(password, thisPassword, function(err, same) {
          if (err) {
            callback(err);
          } else {
            callback(err, same);
          }
        });
      }
    const {emailAddress:email,password,username} = req.body;
    const alreaydExists = await
           Users.where('email', '=', email).get();
    if(alreaydExists._size){
         res.status(401).json({
             error: 'User already exists !'
         })
    } else {
        const userId = uuidv4()
        try {
            await Users.doc(userId).set({email,password,username});
           const currentUser = await
                Users.where('email', '=', email).get();
            if(!currentUser._size){
                res.status(401).json({
                    error: 'User not created !'
                })
            } else {
        const user = currentUser.docs.map((doc)=>{
            const userDetail = {
                data: doc.data(),
                id: doc.id
            }
            return userDetail;
        })[0];

                    
        const payload = { email, id: user?.id };
        const token = jwt.sign(payload, secret , {
            expiresIn: '1h'
        });
        const cookie = req.cookies.token
        if (!cookie){
            res.cookie('token', token, {httpOnly: true})
        }
    
            res.status(201).send({
                token,
                id: user?.id
            })
                     
         

    }     
        } catch (err) {
            console.log(err);
           res.status(500).json({
             error: 'Server Error !'
         })   
        }
    }
})



Route.post('/login', async(req,res)=>{  
    const isCorrectPassword = function(password,thisPassword, callback) {
        bcrypt.compare(password, thisPassword, function(err, same) {
          if (err) {
            callback(err);
          } else {
            callback(err, same);
          }
        });
      }

    const {email,password} = req.body;
    const alreaydExists = await
           Users.where('email', '=', email).get();
    if(!alreaydExists._size){
         res.status(401).json({
             error: 'User do not exists !'
         })
    } else {
        const user = alreaydExists.docs.map((doc)=>{
            const userDetail = {
                data: doc.data(),
                id: doc.id
            }
            return userDetail;
        })[0];

        const savedPassword = user?.data?.password
        isCorrectPassword(password, savedPassword, (err, same) => {
                     if (err) {
                         res.status(500).json({
                             error: 'Internal server errror'
                         })
                     } else if (!same) {
                         res.status(403).json({
                             error: "Incorrect password"
                         })
                     } else {
                         const payload = { email, id: user?.id };
                         const token = jwt.sign(payload, secret , {
                                expiresIn: '1h'
                         });
                         const cookie = req.cookies.token
                         if (!cookie){
                             res.cookie('token', token, {httpOnly: true})
                         }
                        
                        res.status(201).send({
                            token,
                            id: user?.id
                        })
                     }
          } )

    }
})

Route.get("/isAuth",async (req,res,next)=>{
    const req_token = req.cookies.token;
    let auth = false;
    console.log(req_token,"req_token");
    if (!req_token){
        return res.status(200).send({
            message:'Please login'
        })
    }

    try{
        if(!jwt.verify(req_token,process.env.COOKIE_SECRET)){
            throw 'token not valid'
        } else {
            auth = true
        }
    }
    catch(err){
        console.log(jwt.verify(req_token,process.env.COOKIE_SECRET));
        console.log('Invalid token');
        return res.status(200).send({
            message:'Invalide token'
        })
    }

    if(!auth){
        return res.status(200).send({
            'message': 'token verification failed'
        })
    } else {
        const data = jwt.verify(req_token, process.env.COOKIE_SECRET);
        console.log(data);
        const dbUser = await Users.doc(`${data.id}`).get();
        if (!dbUser.exists){
            return res.status(200).json({
                'message': 'token verification failed'
            })
        } else {
            const payload = { email: data?.email, id: data?.id };
            const token = jwt.sign(payload, secret , {
                   expiresIn: '1h'
            });

           res.status(201).send({
            token:req_token,
               id: data?.id,
               email:data?.email
           })

        }
    }
})


Route.post("/logout",(req,res,next)=>{
    res.cookie('token',undefined)
    res.clearCookie('token')
    res.status(200).send({
        "logout":true
    })
})


module.exports = Route