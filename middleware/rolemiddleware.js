import jwt from "jsonwebtoken"
import schoolModel from "../model/schoolModel.js"



const  studentMiddleware =async(req,res,next)=>{
    if(req.cookies.token){
        const token = req.cookies.token
        console.log(token)
        //decode
        const payload = jwt.decode(token)
        const emailpayload = payload.email
        try{
            const staffMember = await schoolModel.findOne({email:emailpayload})
            const role= staffMember.role
            if(role==='headteacher'){
                console.log('you have access')
                next()
            }
        }
        catch(error){
            console.log(error)
        }
        
    }
    else{
        console.log('access dinied')
    }
}

export default studentMiddleware