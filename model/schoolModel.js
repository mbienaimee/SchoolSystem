import mongoose from "mongoose";
import bcrypt from "bcrypt"

const schoolSchema = new mongoose.Schema({
  lastName: {
    type: String,
    required: [true, "please insert your lastname"],
  },
  firstName:{
    type:String,
    required:[true,'please insert your firstname']
  },
  email:{
    type:String,
    required:[true,'insert your email'],
    unique:[true,'email can be unique']
  },
  password:{
    type:String,
    unique:true,
    minlength:[8,'minimum length can be 8'],
    maxlength:[36,'maxmum length can be 36']
  },
  role:{
    type:String,
    required:true
  }

},{timestamps:true});
schoolSchema.pre('save',async function(next){
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password,salt)
    next()

})
const schoolModel = mongoose.model('staff',schoolSchema)
export default schoolModel
