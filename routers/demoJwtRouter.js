const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");


router.get('/api',(req, res) => {
    res.json({ 
        message: 'Welcome to the API!',
    });
});

// Post to Validate the API with jwt token
router.post('/api/validate',verifyToken,(req, res)=>{
    jwt.verify(req.token,'secretkey',(err,authData)=>{
        if(err){
            res.sendStatus(403);
        }else{
            res.json({
                message: 'Validated',
                authData
            });
        }
    });
});
// TO access the token
router.post('/api/login',(req, res) => {  
    //Mock user  
    const user ={  
        username: 'jk',  
        email: 'jaykrishnareddy@gmail.com'  
    }  
    jwt.sign({user:user},'secretkey',{expiresIn: '30s'},(err,token)=>{  
        res.json({token})  
    })  
})  
//Access token
//Authorization : Bearer <access token>y

//Verify Token
function verifyToken(req, res,next) {
    //Get Auth header value
    const bearerHearder = req.headers['authorization'];
    //check if bearer is undefined
    if(typeof bearerHearder != 'undefined'){
        //split at the space
        const bearer = bearerHearder.split(' ');
        //Get the token from array
        const bearerToken = bearer[1];
        // set the token
        req.token = bearerToken;
        //Next middleware
        next();

    }else{
        //Forbidden
        res.sendStatus(403);
    }
}
module.exports = router;