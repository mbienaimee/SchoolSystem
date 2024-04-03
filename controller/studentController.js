import studentModel from "../model/student.model.js";

const student = {
    creating : async (req,res)=>{
        try{
const newStudent = await studentModel.create(req.body)
res.status(201).json({
    message:'student created',
    student:newStudent
})
        }
        catch(error){

        }
    }
}

export default student