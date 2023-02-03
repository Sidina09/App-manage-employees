import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const Schema = mongoose.Schema;
let userSchema = new Schema(
    {
        firstName: { type: String, required: true, min:3 , max:20 },
        lastName: { type: String,  required: true, min:3 , max:20  },
        email: { type: String,unique: true, required: true },
        password: { type: String, required: true},
        role: { type: String, 
                enum:['super admin','Director', 'Administration Director', 'Administration Assistant', 'Team Manager', 'Software Enginner'],
        default: 'super admin', required: true },
        building: { type: [String], enum:['Front-End','Back-End','Full-Stack'], default: null, required: true },
        phone: { type: String, default: "0000",required: true },
        avatar: { type: String, required: false },
        isActive: { type: Boolean, default: false },
        activationCode: String
    }, {
        timestamps: { currentTime: () => Date.now() },versionKey: false }
);

userSchema.plugin(uniqueValidator)

let User = mongoose.model("users", userSchema);


export default User;