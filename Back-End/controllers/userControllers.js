import User  from "../models/userModel.js"
import bcrypt  from "bcrypt"
import  { sendConfirmationEmail, sendCreateEmail, sendForgotPassword } from "../middlewares/nodemailer.js";
import jwt  from "jsonwebtoken"
import { config } from 'dotenv'

config()

export const addUser =  (req, res, next) => {
    // const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!;,*+-&§';
    // let activationCode = '';
    // for (let i= 0; i < 25; i++) 
    // activationCode += characters.charAt(Math.floor(Math.random() * characters.length))
    
    const charactersPass = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let generatePassword = '';
    for (let i= 0; i < 6; i++) {
        generatePassword += charactersPass.charAt(Math.floor(Math.random() * characters.length))
    }
    const plainPassword = generatePassword;
    bcrypt.hash(plainPassword, 10)
            .then(hash => {
                let user = new User({
                    firstName : req.body.firstName,
                    lastName : req.body.lastName, 
                    email : req.body.email, 
                    password: hash,
                    role : req.body.role, 
                    building : req.body.building,
                    phone : req.body.phone, 
                    avatar : req.body.avatar
                    // activationCode: activationCode
                    
                })
                console.log("password without hashing",plainPassword) 
                console.log("password with hashing",user.password)
                user.save()
                    .then(() => {
                        res.status(201).json({ message: 'User Created ' })
                        sendCreateEmail(user.email, plainPassword)
                        // sendConfirmationEmail( user.email, user.activationCode )
                    })
                    .catch(error => res.status(400).json({ error }))
            })
            .catch(error => res.status(500).json({ error }))
}

// export const verifyUser = (req, res, next) => {
//     User.findOne({ activationCode: req.params.activationCode })
//         .then(user => {
//             if(!user) return res.status(500).json({ error: 'Code is wrong ! ' });
//             user.isActive = true;
//             user.save();
//             res.status(200).json({ message: 'The account is successfully activated' });
//         })
//         .catch(error => res.status(500).json({ error: 'Code is wrong !' }));
// }

export const login = (req, res, next) => {
    User.findOne({ email: req.body.email }) 
    .then(user => { 
        if (!user) { 
            return res.status(401).json({ error: 'User not found !' }); 
        } 
       bcrypt.compare(req.body.password, user.password) 
        .then(reslt => { 
            if (!reslt) { 
               return res.status(401).json({  error: 'Incorrect password !'});    
            } 
            // if(user && reslt && !user.isActive) {
            //     return res.status(400).json({ error: 'Please check your email for confirmation' })
            // }
            res.status(200).json({ 
                userId: user._id, 
                token: jwt.sign( 
                    { userId: user._id , role: user.role}, 
                    process.env.ACCESS_TOKEN,
                    { expiresIn: '23h' }), 
                refreshToken: jwt.sign(
                    { userId: user._id , role: user.role}, 
                    process.env.REFRESH_TOKEN,
                    { expiresIn: '24h' }
                )   
            });       
        }) 
        .catch(error => res.status(500).json({ error }));       
    })
    .catch(error => res.status(500).json({ error }));   
}

export const forgotPassword =  async ( req, res) => {
    const {email} = req.body;
    try {
        const oldUser = await User.findOne({email})
        if (!oldUser) {
            return res.send("User not exist")
        }
        const secret = process.env.ACCESS_TOKEN + oldUser.password
        const token = jwt.sign({ email: oldUser.email, id: oldUser._id}, secret,
            { expiresIn: '24h' });
        sendForgotPassword(oldUser.email, oldUser._id, token)
        res.status(200).json({ message: 'Please check your email for reset your password!'})
    } catch (error) {
        res.status(500).json({ error }); 
    }
}

export const resetPassword = async (req, res) => {
    const {id, token} = req.params;
    const {password} = req.body;
    const oldUser = await User.findOne({_id: id})
    if(!oldUser) {
        return res.json({error: 'User not found'})
    }
    const secret = process.env.ACCESS_TOKEN + oldUser.password
    try {
        const verify = jwt.verify(token , secret);
        const encryptedPassword = await bcrypt.hash(password, 10)
        await User.updateOne(
            {_id: id},
            {$set : {
                password: encryptedPassword
                }
            }
        )
        res.json({message: "password updated"})
    } catch (error) {
        res.json({message: "somthing went wrong!!"})
        }
}

export const getUsers = (req, res, next) => {
    User.find({}, (err, results) => {
        err ? res.send(err) : res.send(results)
    });
}


export const getUserById = (req, res) => {
    User.find({ _id: req.params.id }, (err, result) => {
        if (!err) {
            res.send(result);
        }
    });
}

export const deleteUser = async (req, res) => {
    try {
        if (User.find({role: "super admin"})) {
        const user = await User.findByIdAndDelete(req.params.id);
        res.status(200).send({ message: `${user.lastName} ${user.firstName} is succussffully deleted` });
    }else {
        res.status(400).send({ error: "you dont have permission" })}
    }
    catch (err) {
        res.status(400).send({ error: `error deleting user ${err}` })
        }
   
}

export const deleteAllUsers = async (req, res) => {
    try {
        const users = await User.deleteMany( {'role': {$nin:["super admin"]}});
        res.status(200).send({ message: `succussffully deleted exepted the super admin` });
    }
    catch (err) {
        res.status(400).send({ error: `error deleting users ${err}` })
        }
}

export const updateUser = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id,req.body );
        await user.save()
        res.status(200).send({ message: `is succussffully updated` });
    }
    catch (err) {
        res.status(400).send({ error: `error updating user ${err}` })
    }
}