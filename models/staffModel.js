import mongoose from "mongoose";

const staffSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    department: String,
    experience: String,
    departmentCode: String,
    staffCode: String,
    email: String,
    phoneNumber: String,
    jobPosition: String,
    profileImage: String
});
export default mongoose.model("Staff", staffSchema);