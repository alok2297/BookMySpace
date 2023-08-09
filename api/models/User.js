import mongoose from 'mongoose';

const UserSchema = mongoose.Schema({
    username:{
        type:String,
        require:true,
        unique:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true
    },
    isAdmin:{
        type:Boolean,
        default:false
    }
},{Timestamp:true});

export default mongoose.model("User",UserSchema);