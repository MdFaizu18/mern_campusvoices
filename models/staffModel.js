import mongoose from "mongoose";

const staffSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    department: String,
    experience: String,
    departmentCode: String,
    staffCode: String,
    email: String,
    role: {
        type: String,
        default: "staff",
    },
    password:String,
    phoneNumber: String,
    jobPosition: String,
    profileImage: {
        type:String,
        default:""
    }
});
export default mongoose.model("Staff", staffSchema);