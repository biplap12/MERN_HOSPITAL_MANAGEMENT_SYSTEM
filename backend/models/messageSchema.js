import mongoose from "mongoose";
import validator from "validator";

const messageSchema = new mongoose.Schema(
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
        message: {
            type: String,
            required: true,
            minLength: [10, "Message must be at least 10 characters long."]
        },
    });

const Message = mongoose.model("Message", messageSchema);
export default Message;


