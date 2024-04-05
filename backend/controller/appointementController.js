
import Appointment from '../models/appointmentSchema.js';
import {catchAsyncError }from '../middlewares/catchAsyncError.js';
import ErrorHandler from '../middlewares/errorMiddleware.js';
import User from '../models/userSchema.js';

const postAppointment = catchAsyncError(async (req, res, next) => {
    const {
        firstName,
        lastName,
        email,
        phone,
        dob,
        gender,
        appointment_Date,
        department,
        doctor_firstName,
        doctor_lastName,
        hasvisited,
        address,
    } = req.body;

    if (!firstName || !lastName || !email || !phone || !dob || !gender || !appointment_Date || !department || !doctor_firstName || !doctor_lastName || !address) {
        return next(new ErrorHandler("Please fill all the fields.", 400));
    }  
  
    const isConflict = await User.find({
        firstName: doctor_firstName,
        lastName: doctor_lastName,
        role:'Doctor',
        doctorDepartment: department
    });

    if ( isConflict.length === 0) {
        return next(new ErrorHandler("Doctor not found.", 404));
    }

    if (isConflict.length > 1) {
        return next(new ErrorHandler("Doctor Conflict!! Please Contact Through Email or Phone.", 400));
    }

    const  doctorId = isConflict[0]._id;
    const patientId = req.user._id;

    const appointment = await Appointment.create({
        firstName,
        lastName,
        email,
        phone,
        dob,
        gender,
        appointment_Date,
        department,
        doctor: {
            firstName: doctor_firstName,
            lastName: doctor_lastName,
        },
        hasvisited,
        address,
        doctorId,
        patientId,
    });

    res.status(200).json({
        success: true,
        message: "Appointment created successfully!!",
        appointment
    });
    if (!appointment) {
        return next(new ErrorHandler("Appointment not created.", 400));
    }
 
});

const getAllAppointments = catchAsyncError(async (req, res, next) => {
    const appointments = await Appointment.find({}).populate("doctorId").populate("patientId");

    res.status(200).json({
        success: true,
        appointments
    });
}
);


const updateAppointmentStatus = catchAsyncError(async (req, res, next) => {
    const { id } = req.params;
    const { status } = req.body;

    const appointment = await Appointment.findById(id);
    if (!appointment) {
        return next(new ErrorHandler("Appointment not found.", 404));
    }

  const newAppointment = await Appointment.findByIdAndUpdate(id, {status},
        {
            new: true,
            runValidators: true,
            useFindAndModify: false
        });

    res.status(200).json({
        success: true,
        message: "Appointment updated successfully!!",
        newAppointment
    });
}
);

const deleteAppointment = catchAsyncError(async (req, res, next) => {
    const { id } = req.params;
    const appointment = await Appointment.findById(id);
    if (!appointment) {
        return next(new ErrorHandler("Appointment not found.", 404));
    }

    const deletedAppointment = await Appointment.findByIdAndDelete(id);

    res.status(200).json({
        success: true,
        message: "Appointment deleted successfully!!",
    });
}
);


export { postAppointment, getAllAppointments, updateAppointmentStatus, deleteAppointment};
