import { connectDB } from "../Back-End/configuration/connectMongodb.js";
import User from "../Back-End/models/userModel.js";
import bcrypt from "bcrypt";
import { sendCreateEmail } from "../Back-End/middlewares/nodemailer.js";
import data from '../Back-End/superAdmin.json' assert { type: "json" }

connectDB ()
console.log(data)

const charactersPass = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let generatePassword = '';
    for (let i= 0; i < 6; i++) {
        generatePassword += charactersPass.charAt(Math.floor(Math.random() * charactersPass.length))
    }
const plainPassword = generatePassword;

console.log(plainPassword) 
const query = User.findOne({ 'role' : 'super admin' });
query.select('role')
query.exec( (err, res, next) => {
    if(err) res.status(500).json({ err })
    else {
        if (res) {
            console.log('Super admin is already exist!');
            return process.exit()
        } else {
            bcrypt.hash(plainPassword, 10)
            .then((hashedPassword) => {
                const user = new User({
                    firstName: data.firstName,
                    lastName: data.lastName,
                    email: data.email,
                    password: hashedPassword,
                    role: data.role,
                    phone: data.phone
                })
                console.log("password without hashing",plainPassword) 
                console.log("password with hashing",user.password)
                user.isActive = true
                user.save()
                sendCreateEmail(user.email, plainPassword)
                console.log('Super admin is created ' )
            })
            .catch((err) => console.log(err))
        }
    }
})

