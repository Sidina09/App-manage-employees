import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const Schema = mongoose.Schema;
let daysOffSchema = new Schema(
    {
        startDate : Date,
        endDate : Date,
        type: {type: [String],enum:["Paid", "Unpaid","Sick"] },
        descisionManager: {
            idUser: String,
            status: String,
            justification: null || String },
        descisionDirector: {
            idUser: String,
            status: String,
            justification: null || String },
        isActive: { type: Boolean, default: false }
    }, {
        timestamps: { currentTime: () => Date.now() },versionKey: false }
);

daysOffSchema.plugin(uniqueValidator)

let daysOff = mongoose.model("daysOff", daysOffSchema);


export default daysOff;