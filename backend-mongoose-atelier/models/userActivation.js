const  mongoose =require("mongoose")
const User =require("./user.js");
const userActivationSchema=mongoose.Schema({
    isActive :{ type: Boolean,
        default: false,
        enum: [
            false,
            true
        ]},
    userID: {type:mongoose.Schema.Types.ObjectId,
    ref:User}
    })
   
    module.exports=mongoose.model('userActivation',userActivationSchema)
