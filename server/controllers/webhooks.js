// import { Webhook } from 'svix'
// import User from '../models/User.js';
// // API Controller Function to Manage Clerk User with database
// export const clerkWebhooks = async(req,res)=>{
//   try{
//     // create a Svix instance with clerk webhook secret.
//     const whook = new Webhook (process.env.CLERK_WEBHOOK_SECRET)
//     // Verifying Headers
//     await whook.verify(JSON.stringify(req.body),{
//       'svix-id':req.headers['svix-id'],
//       'svix-timestamp':req.headers['svix-timestamp'],
//       'svix-signature':req.headers['svix-signature']
//     })
//     // Getting Data from request body
//     const { data, type } = req.body
//     // Switch Cases for different Events
//     switch(type){
//       case 'user.created':{
//         const userData = {
//           _id:data.id,
//           email:data.email_addresses[0].email_address,
//           name:data.first_name+" "+data.last_name,
//           image:data.image_url,
//           resume:''
//         }
//         await User.create(userData)
//         res.json({})
//         break;
//       }
//       case 'user.updated':{
//         const userData = {
//           email:data.email_addresses[0].email_address,
//           name:data.first_name+" "+data.last_name,
//           image:data.image_url,
//         }
//         await User.findByIdAndUpdate(data.id, userData)
//         res.json({})
//         break;
//       }
//       case 'user.deleted':{
//        await User.findByIdAndDelete(data.id)
//        res.json({success: true })
//        break;
//       }
//       default:
//         console.log(`Unhandled Clerk event type: ${type}`);
//         res.status(200).end();
//         break;
//     }
//   }catch(error){
//    console.log(error.message);
//    res.json({success:false, message:'Webhooks Error'})
//   }
// } 
import { Webhook } from 'svix';
import User from '../models/User.js';

export const clerkWebhooks = async (req, res) => {
  try {
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    // ✅ Verify raw payload
    const payloadString = req.body.toString('utf8');
    whook.verify(payloadString, {
      'svix-id': req.headers['svix-id'],
      'svix-timestamp': req.headers['svix-timestamp'],
      'svix-signature': req.headers['svix-signature'],
    });

    const { data, type } = JSON.parse(payloadString);

    switch (type) {
      case 'user.created':
        await User.create({
          _id: data.id,
          email: data.email_addresses[0].email_address,
          name: `${data.first_name || ''} ${data.last_name || ''}`.trim(),
          image: data.image_url,
          resume: '',
        });
        break;

      case 'user.updated':
        await User.findByIdAndUpdate(data.id, {
          email: data.email_addresses[0].email_address,
          name: `${data.first_name || ''} ${data.last_name || ''}`.trim(),
          image: data.image_url,
        });
        break;

      case 'user.deleted':
        await User.findByIdAndDelete(data.id);
        break;

      default:
        console.log(`Unhandled Clerk event type: ${type}`);
    }

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Webhook Error:', error.message);
    res.status(400).json({ success: false, message: 'Webhook verification failed' });
  }
};

