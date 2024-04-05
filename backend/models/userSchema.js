import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
    {
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
        password: {
            type: String,
            required: true,
            minLength: [8, "Password must be at least 8 characters long."],
            select: false
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
        role: {
            type: String,
            required: true,
            enum: ["Admin", "Patient", "Doctor"],
        },
        doctorDepartment: {
            type: String
        },
        docAvatar: {
        public_id: String,
        url: String,
        },

    });

    userSchema.pre("save", async function (next) {
        if (!this.isModified("password")) {
            next();
        }
        this.password = await bcrypt.hash(this.password, 10);
    });

    userSchema.methods.comparePassword = async function (enteredPassword) {
        return await bcrypt.compare(enteredPassword, this.password);
    }

    userSchema.methods.generateJsonWebToken = function () {
        return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES,
        });
    };

const User = mongoose.model("User", userSchema);
export default User;


