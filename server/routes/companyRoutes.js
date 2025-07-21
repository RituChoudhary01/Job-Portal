import express from 'express'
import { ChangeJobApplicationStatus, changeVisiblity, getCompanyData, getCompanyJobApplicants, getCompanyPostedJobs, loginCompany, postJob, registerCompany } from '../controllers/companyController'
import upload from '../config/multer'
import { protectCompany } from '../middleware/authMiddleware.js'

const router = express.Router()

// Register a company
router.post('/register',upload.single('image'),registerCompany)
// Company Login
router.post('/login',loginCompany)
// Get company data
router.get('/company',protectCompany,getCompanyData)
// Post a job
router.post('/post-job',protectCompany,postJob)
// Get Applicants Data of company
router.get('/applicants',protectCompany,getCompanyJobApplicants)
// get company job list
router.get('/list-jobs',protectCompany,getCompanyPostedJobs)
// Change Application status
router.post('/change-status',protectCompany,ChangeJobApplicationStatus)
// Change Applcations Visiblity
router.post('/change-visiblity',protectCompany,changeVisiblity)
export default router