const express = require('express');
const router = express.Router();
const User = require('../models/user.js');
const  jwt  = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const UserActivation = require('../models/userActivation.js');
// bibliothèque nodemailer

const nodemailer=require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
      user: 'ozella.zieme@ethereal.email',
      pass: 'E3yyaRmyPUZwbFVy5v'
  }
});

//Register

router.post('/register', async (req, res, )=> {

    const{name,email,password,role,avatar}=req.body;

    const user = await User.findOne({ email })
    if (user) return res.status(404).send({ success: false, message: "Account already exists" })

    const salt=await bcrypt.genSalt(10);
    const hash=await bcrypt.hash(password,salt);

    const newUser=new User({
      name:name,
      email:email,
      password:hash,
      role:role,
      avatar:avatar
        });
    try {
           await newUser.save();
   
// Début traitement node mailer
/*
*************************************************************** 
*/

// Save dans userActivation

const newUserActivation=new UserActivation({
  isActive:false,
  userID : newUser._id
    });

try {
       await newUserActivation.save();
    }
catch (err) {console.log(err)}

// Envoyer l'e-mail de confirmation de l'inscription
var mailOption ={
  from: '"verify your email " <abcCorporation@gmail.com>',
  to: newUser.email,
  subject: 'Verification of your email ',
  html:`<h2>${newUser.name}! Thank you for registreting on our website</h2>
  <h4>Please verify your email to procced... </h4>
  <a href="http://${req.headers.host}/api/users/status/edit?email=${newUser.email}">click here</a>`
}
transporter.sendMail(mailOption,function(error,info){
  if(error){
    console.log(error)
  }
  else{
    console.log('verification email sent to your gmail account ')
  }
})

/*
*************************************************************** 
*/
// fin traitement node mailer


        return res.status(201).send({ success: true, message: "Account created successfully", user: newUser })
       } catch (error) {
           res.status(409).json({ message: error.message });
       }
  
});


// Début suite traitement node mailer

/*
*************************************************************** 
*/

router.get('/status/edit', async (req, res) => {
  try {
  let email = req.query.email
  let user = await User.findOne({email})

  let userActivated = await UserActivation.findOne({userID :user._id})
  
  userActivated.isActive = !userActivated.isActive
  userActivated.save()
  // res.redirect("https://www.google.fr/")
   res.send ({ success: true, message: "Account activated successfully"})
  } catch (err) {
  return res.status(404).send({ success: false, message: err })
  }
  })

  /**
 * as an admin i can disable or enable an account 
 */
  router.put('/status/edit',  async (req, res) =>  {
    try {

        let { idUser } = req.body
        let user = await UserActivation.findOne({idUser}).select('+isActive')
        user.isActive = !user.isActive
        user.save()
        res.status(200).send({ success: true, user })
    } catch (err) {
        return res.status(404).send({ success: false, message: err })
    }
   })

 
/*
*************************************************************** 
*/
// fin traitement node mailer


//Generate Token 
const generateToken=(user) =>{
    return jwt.sign({user}, process.env.TOKEN, { expiresIn: '60s' });
  }

// login
router.post('/login', async (req, res) =>  {
    try {
        let { email, password } = req.body

        if (!email || !password) {
            return res.status(404).send({ success: false, message: "All fields are required" })
        }

        let user = await User.findOne({ email })
        
        if (!user) {

            return res.status(404).send({ success: false, message: "Account doesn't exists" })

        } else {

      let isMatch = await bcrypt.compare(password, user.password)
      if(!isMatch) {res.status(400).json({success: false, message:'Please verify your credentials'}); return;}

       const token = generateToken(user);
       const refreshToken = generateRefreshToken(user);

       // retour de l’état de l’activation du compte
       let userActivated = await UserActivation.findOne({userID :user._id})
                  
       res.status(200).json({ 
        success: true, 
        token,
        refreshToken,
        user,
        isActive :userActivated.isActive
    })
   }
 } catch (error) {
    res.status(404).json({ message: error.message });
}
});

// Refresh
function generateRefreshToken(user) {
    return jwt.sign({user}, process.env.REFRESH_TOKEN, { expiresIn: '1y' });
  }
  
  //Refresh Route
  
  router.post('/refreshToken', async (req, res, )=> {  
  const refreshtoken = req.body.refreshToken;
    if (!refreshtoken) {
     return res.status(404).json({ success: false,message: 'Token Not Found' });
        }
    else {
        jwt.verify(refreshtoken, process.env.REFRESH_TOKEN, (err, user) => {
          if (err) {
            return res.status(406).json({success: false, message: 'Unauthorized Access' });
          }
          else {
           const token = generateToken(user);
 
           const refreshToken = generateRefreshToken(user);
   
          res.status(200).json({
           token,
           refreshToken
         })
            }
        });
       }
   
  });

  // afficher la liste des utilisateurs.
router.get('/', async (req, res, )=> {
  try {
      const users = await User.find().select("-password");              
      return res.status(200).json(users)
 
  } catch (error) {
      res.status(404).json({ message: error.message });
  }

});

module.exports = router;
