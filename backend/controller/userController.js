import User from '../models/userSchema.js';
import {catchAsyncError} from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";
import { generateToken } from '../utils/jwtToken.js';
import cloudinary from "cloudinary";

const patientRegister = catchAsyncError(async (req, res, next) => {
    const { firstName, lastName, email, phone, dob, gender, password } =
      req.body;
    if (
      !firstName ||
      !lastName ||
      !email ||
      !phone ||
      !dob ||
      !gender ||
      !password
    ) {
      return next(new ErrorHandler("Please Fill Full Form!", 400));
    }
  
    const isRegistered = await User.findOne({ email });
    if (isRegistered) {
      return next(new ErrorHandler("User already Registered!", 400));
    }
  
    const user = await User.create({
      firstName,
      lastName,
      email,
      phone,
      dob,
      gender,
      password,
      role: "Patient",
    });
    generateToken(user, "User Registered!", 200, res);
  });

const patientLogin = catchAsyncError(async (req, res, next) => {
    const {email, password, role} = req.body;  
    if(!email || !password || !role){
        return next(new ErrorHandler("Please fill in all fields.", 400));
    }  
    // if(password !== confirmPassword){
    //     return next(new ErrorHandler("Passwords And Confirm Passwords Do Not Match.", 400));
    // }
    const user = await User.findOne({email}).select("+password");
    if(!user){
        return next(new ErrorHandler("Invalid Email or Password", 401));
    }
    const isPasswordMatched = await user.comparePassword(password);
    if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid Email or Password", 401));
    }

    if(user.role !== role){
        return next(new ErrorHandler("Invalid Role !!", 401));
    }
    generateToken(user, "Patient Logged In Successfully.", 200, res);
}
);

const addNewAdmin = catchAsyncError(async (req, res, next) => {
    const {firstName,
        lastName,
        email,
        phone,
        password,
        gender,
        dob,
    } = req.body;
  if(!firstName || !lastName || !email || !phone || !password || !gender || !dob){
        return next(new ErrorHandler("Please fill in all fields.", 400));
    }
    const isRegistered = await User.findOne({email});
    if(isRegistered){
        return next(new ErrorHandler(`${isRegistered.role} already Registered with this email.`, 400));    }
    const admin = await User.create({
        firstName,
        lastName,
        email,
        phone,
        password,
        gender,
        dob,
        role: "Admin"
    });
    res.status(201).json({
        success: true,
        message: "Admin Registered Successfully."
    });

});

 const getAllDoctors = catchAsyncError(async (req, res, next) => {
    const doctors = await User.find({role: "Doctor"});
    res.status(200).json({
        success: true,
        doctors
    });

});

const  getUserDetails = catchAsyncError(async (req, res, next) => {
    const user = req.user;
    res.status(200).json({
        success: true,
        user,
    });
});

const logoutAdmin = catchAsyncError(async (req, res, next) => {
    // res.cookie("adminToken", null, {
    //     expires: new Date(Date.now()),
    //     httpOnly: true
    // });
    res.status(200).cookie("adminToken","", null, {
        expires: new Date(Date.now(
            Date.now() + process.env.COOKIE_EXPIRES * 24 * 60 * 60 * 1000
        )),
        httpOnly: true
    }).
    json({
        success: true,
        message: "Logged Out Successfully."
    });
}
);

const logoutPatient = catchAsyncError(async (req, res, next) => {
    res.status(200).cookie("patientToken","", null, {
        expires: new Date(Date.now(
            Date.now() + process.env.COOKIE_EXPIRES * 24 * 60 * 60 * 1000
        )),
        httpOnly: true
    }).
    json({
        success: true,
        message: "Logged Out Successfully."
    });
}
);


const addNewDoctor = catchAsyncError(async (req, res, next) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return next(new ErrorHandler("Please upload an image.", 400));
    }
    const { docAvatar } = req.files;
    const allowedFormats = ["image/png", "image/jpg", "image/jpeg"];
    if (!allowedFormats.includes(docAvatar.mimetype)) {
        return next(new ErrorHandler("File Format Not Supported.", 400));
    }
    
    const { firstName, lastName, email, phone, password, gender, dob, doctorDepartment } = req.body;
    if (!firstName || !lastName || !email || !phone || !password || !gender || !dob || !doctorDepartment) {
        return next(new ErrorHandler("Please Provide All Fields.", 400));
    }
    const isRegistered = await User.findOne({ email });
    if (isRegistered) {
        return next(new ErrorHandler(`${isRegistered.role} already Registered with this email.`, 400));
    }

    const cloudinaryResponse = await cloudinary.v2.uploader.upload(docAvatar.tempFilePath);

    if (cloudinaryResponse.error) {
        console.error("Cloudinary Upload Failed.", cloudinaryResponse.error);
        return next(new ErrorHandler("Cloudinary Upload Failed.", 500));
    }

    const doctor = await User.create({
        firstName,
        lastName,
        email,
        phone,
        password,
        gender,
        dob,
        doctorDepartment,
        role: "Doctor",
        docAvatar: {
            public_id: cloudinaryResponse.public_id,
            url: cloudinaryResponse.secure_url
        }
    });
    res.status(201).json({
        success: true,
        message: "Doctor Registered Successfully.",
        doctor
    });
});









export {patientRegister, patientLogin, addNewAdmin, getAllDoctors, getUserDetails, logoutAdmin, logoutPatient, addNewDoctor};


        



