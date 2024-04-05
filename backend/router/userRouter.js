import express from 'express';
import  {addNewAdmin, addNewDoctor, getAllDoctors, getUserDetails, logoutAdmin, logoutPatient, patientLogin, patientRegister}  from '../controller/userController.js';
import { isAdminAuthenticated, isPatientAuthenticated } from '../middlewares/auth.js';

const router = express.Router();

router.post('/patient/register', patientRegister)
router.post('/login', patientLogin)
router.post('/admin/addnew',isAdminAuthenticated, addNewAdmin)
router.get('/doctors', getAllDoctors);
router.get("/admin/me", isAdminAuthenticated, getUserDetails);
router.get("/patient/me", isPatientAuthenticated, getUserDetails);
router.get("/admin/logout", isAdminAuthenticated, logoutAdmin);
router.get("/patient/logout", isPatientAuthenticated, logoutPatient);
router.post("/doctor/addnew", isAdminAuthenticated, addNewDoctor);


export default router;