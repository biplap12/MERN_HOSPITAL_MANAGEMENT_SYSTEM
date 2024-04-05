import mongoose from "mongoose";
import validator from "validator";

const appointmentSchema = new mongoose.Schema({
        firstName: {
            type: String,
            required: true,
            minLength: [3, "First name must be at least 3 characters long."]
        },
        lastName: {
            type: String,
            required: true,
            minLength: [3, "Last name must be at least 3 characters long."]
        },
        email: {
            type: String,
            required: true,
            validate: {
                validator: validator.isEmail,
                message: "Email is not valid."
            }
        },
        phone: {
            type: String,
            required: true,
            minLength: [10, "Phone number must be 10 characters long."],
            maxLength: [10, "Phone number must be 10 characters long."]
        },
        dob: {
            type: Date,
            required: [true, "Date of Birth is required."]
        },
        gender: {
            type: String,
            required: true,
            enum: ["Male", "Female", "Other"],
        },
        appointment_Date: {
            type: String,
            required: true,
        },
        department: {
            type: String,
            required: true,
        },
        doctor: {
            firstName: {
                type: String,
                required: true,
            },
            lastName: {
                type: String,
                required: true,
            },
        },
        hasvisited: {
            type: Boolean,
            default: false,
            
        },
        doctorId :{
            type: mongoose.Schema.ObjectId,
            required: true,
        },
        patientId :{
            type: mongoose.Schema.ObjectId,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            required: true,
            enum: ["Pending", "Accepted", "Rejected"],
            default: "Pending",
        },
    });

const Appointment = mongoose.model("Appointment", appointmentSchema);
export default Appointment;