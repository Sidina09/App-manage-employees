import User from "../models/userModel.js"
import daysOff from "../models/daysOffModel.js"

export const home = (req, res) => { res.send('Hello server ...'); }


export const getDaysOff = (req, res, next) => {
    daysOff.find({}, (err, results) => {
        err ? res.send(err) : res.send(results)
    });
}


export const getDaysOffById = (req, res) => {
    daysOff.find({ _id: req.params.id }, (err, result) => {
        if (!err) {
            res.send(result);
        }
    });
}


export const addDaysOff = async (req, res) => {
    
        
    try {
        if(User.find(req.params.id)) {
        let newDaysOff = new daysOff(req.body);
        await newDaysOff.save();
        res.status(200).send({ message: `${User.firstName} ${User.lastName} with id = ${User.id} ,your is succussffully added and the id ${newDaysOff._id} ` });
}    }
    catch (err) {
        res.status(400).send({ error: `error adding new Days Off ${err}` })
        }
}


export const deleteDaysOff = async (req, res) => {
        try {
            if (User.find({email: req.body.email})) {
            const daysOff = await daysOff.findByIdAndDelete(req.params.id);
            res.status(200).send({ message: `${daysOff.id} is succussffully deleted` });
        }else {
            res.status(400).send({ error: "you dont have permission" })}
        }
        catch (err) {
            res.status(400).send({ error: `error deleting ${err}` })
            }
       
} 

   
export const deleteAllDaysOff = async (req, res) => {
    try {
        const daysOffs = await daysOff.deleteMany();
        res.status(200).send({ message: `succussffully deleted ` });
    }
    catch (err) {
        res.status(400).send({ error: `error deleting ${err}` })
        }
}


export const updateDaysOff = async (req, res) => {
    try {
        const daysOff = await daysOff.findByIdAndUpdate(req.params.id, req.body);
        await daysOff.save()
        res.status(200).send({ message: `${daysOff.id} is succussffully updated` });
    }
    catch (err) {
        res.status(400).send({ error: `error updating ${err}` })
        }
}