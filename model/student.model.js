import moongoge from "mongoose"

const studentSchema = new moongoge.Schema({
    lastName:{
        type:String,
        required:true
    },
    firstName:{
        type:String,
        required:true
    },
    class:{
        type:String,
        required:true
    }
},{timestamps:true})

const studentModel = moongoge.model('student',studentSchema)
export default studentModel