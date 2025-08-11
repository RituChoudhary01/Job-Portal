import JobApplication from "../models/JobApplication.js"
import User from "../models/User.js";
import Job from "../models/Job.js";
import { v2 as cloudinary } from "cloudinary";

// Get user data
export const getUserData = async(req,res)=>{
  // const userId = req.auth.userId
  const { userId } = req.auth()
  try{
    const user = await User.findById(userId);
    if(!user){
      return res.json({success:false,message:'User Not Found'})
    }
    res.json({success:true,user})
  }catch(error){
    res.json({success:false, message:error.message})
  }
}
// Apply for a job
export const applyForJob = async(req,res)=>{
   const {jobId} = req.body
   const { userId } = req.auth()
   try{
      const isAlreadyApplied = await JobApplication.find({jobId,userId})
      if(isAlreadyApplied.length>0){
       return res.json({success:false,message:'Already Applied'})
      }
      const jobData = await Job.findById(jobId)
      if(!jobData){
        return res.json({success:false, message:'Job Not Found'})
      }
      await JobApplication.create({
       companyId:jobData.companyId,
       userId,
       jobId,
       date:Date.now()
      })
      res.json({success:true, message:"Applied successfully"})
   }catch(error){
    res.json({success:false, message:error.message})
   }
}  

// Get user applied applications
export const getUserJobApplications = async(req,res) => {
 try{
  //const userId = req.auth.userId
  const { userId } = req.auth()
    const applications = await JobApplication.find({userId}).populate('companyId','name email image').populate('jobId','title description location category level salary').exec()
    // if(!applications){
    //   return res.json({success:false,message:'No job application found for this user.'})
    // }

    if (applications.length === 0) {
      return res.json({ success: false, message: 'No job application found for this user.' });
    }
    return res.json({success:true,applications})
 }catch(error){
  res.json({success:false, message:error.message})
 }
}

// Update user profile (resume)
export const updateUserResume = async(req , res)=>{
try{
  const userId = req.auth.userId
  // const { userId } = req.auth()
  const resumeFile = req.file
  const userData = await User.findById(userId)
   if(resumeFile){
    const resumeUpload = await cloudinary.uploader.upload(resumeFile.path,{ resource_type: "raw" })
    userData.resume = resumeUpload.secure_url
    console.log("Resume upload response:", resumeUpload);
   }
   await userData.save()
   return res.json({success:true, message:'Resume Updated'})
}catch(error){
  res.json({success:false, message:error.message})
}
}

// export const updateUserResume = async (req, res) => {
//   try {
//     const { userId } = req.auth();
//     const resumeFile = req.file;

//     const userData = await User.findById(userId);
//     if (!userData) {
//       return res.status(404).json({ success: false, message: 'User not found' });
//     }

//     if (resumeFile) {
//       const resumeUpload = await cloudinary.uploader.upload(resumeFile.path, {
//         resource_type: 'auto'
//       });
//       userData.resume = resumeUpload.secure_url;
      
//     } else {
//       return res.status(400).json({ success: false, message: 'No resume file provided' });
//     }

//     await userData.save();
//     return res.status(200).json({ success: true, message: 'Resume Updated' });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ success: false, message: error.message });
//   }
// };



