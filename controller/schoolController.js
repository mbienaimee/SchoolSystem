import schoolModel from "../model/schoolModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const secret = process.env.SECREATKEY;

const schoolController = {
  signup: async (req, res) => {
    //all must exist
    const { lastName, firstName, email, password } = req.body;
    //if the member is exist

    const isMemberExist = await schoolModel.findOne({ email: req.body.email });
    if (isMemberExist) {
      console.log("member already exist");
    } else {
      const newMember = await schoolModel.create(req.body);
      res.status(201).json({
        message: "member created",
        member: newMember,
      });
    }
  },
  login: async (req, res) => {
    //allmust exist
    const { email, password, role } = req.body;

    //if the member exist
    const isMember = await schoolModel.findOne({ email: req.body.email });
    if (!isMember) {
      res.status(404).json({
        message: "please register",
      });
    }

    //compare passwords
    const comparision = await bcrypt.compare(
      req.body.password,
      isMember.password
    );
    if (isMember && comparision) {
      //create token
      const token = jwt.sign(
        { user_id: isMember._id, email: isMember.email },
        secret,
        { expiresIn: "2h" }
      );
      const option = {
        expiresIn: new Date(Date.now() * 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };
      res.status(200).cookies("token",token,option).json({
        success:true,
        token,
        isMember
      })
    }
  },
};
export default schoolController;
