// import express from 'express'
// import cors from 'cors'
// import dotenv from 'dotenv';
// import connectDB from './config/db.js'
// import { clerkWebhooks } from './controllers/webhooks.js'
// import companyRouters from './routes/companyRoutes.js'
// import connectcloudinary from './config/cloudinary.js'
// import jobRoutes from './routes/jobRoutes.js'
// import userRoutes from './routes/userRoutes.js'
// import { clerkMiddleware } from '@clerk/express'

// // Initialize express
// const app = express()

// // Connect to database
// dotenv.config();
// await connectDB();
// await connectcloudinary()

// // Middlewares
// app.use(
//   express.json({
//     verify: (req, res, buf) => {
//       req.rawBody = buf; 
//     }
//   })
// )
// app.use(cors())
// app.use(express.json())
// app.use(clerkMiddleware())
// // Routes
// app.get('/', (req, res) => res.send('API Working for insideJobs'))
// app.post('/webhooks', clerkWebhooks)
// app.use('/api/company',companyRouters)
// app.use('/api/jobs',jobRoutes)
// app.use('/api/users',userRoutes)

// // Port
// const PORT = process.env.PORT || 5000;
// Sentry.setupExpressErrorHandler(app);
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv';
import connectDB from './config/db.js'
import { clerkWebhooks } from './controllers/webhooks.js'
import companyRouters from './routes/companyRoutes.js'
import connectcloudinary from './config/cloudinary.js'
import jobRoutes from './routes/jobRoutes.js'
import userRoutes from './routes/userRoutes.js'
import { clerkMiddleware } from '@clerk/express'

dotenv.config();
await connectDB();
await connectcloudinary();

const app = express();

app.use(
  express.json({
    verify: (req, res, buf) => {
      req.rawBody = buf;
    }
  })
);

app.use(cors());
app.use(clerkMiddleware());

app.get('/', (req, res) => res.send('API Working for insideJobs'));
app.post('/webhooks', clerkWebhooks);

app.use('/api/company', companyRouters);
app.use('/api/jobs', jobRoutes);
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
