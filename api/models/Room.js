import mongoose from 'mongoose';
import { Timestamp } from 'mongodb';
const RoomSchema = mongoose.Schema({
    title:{
        type:String,
        require:true,
    },
    desc:{
        type:String,
        require:true
    },
    price:{
        type:Number,
        require:true
    },
    maxPeople:{
        type:Number,
        require:true
    },
    roomNumbers:[{number:Number, unavailableDates:{type:[Date]}}],
},{Timestamp:true});

export default mongoose.model("Room",RoomSchema);