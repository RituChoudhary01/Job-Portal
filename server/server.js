// import './config/instrument.js'
// import express from 'express'
// import cors from 'cors'
// import dotenv from 'dotenv';
// import connectDB from './config/db.js'
// import * as Sentry from '@sentry/node';
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
// app.use(cors())
// app.use(express.json())
// app.use(clerkMiddleware())
// // Routes
// app.get('/', (req, res) => res.send('API Working for insideJobs'))
// app.get("/debug-sentry", function mainHandler(req, res) {
//   throw new Error("My first Sentry error!");
// });

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

import './config/instrument.js';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
// import * as Sentry from '@sentry/node';
import { clerkWebhooks } from './controllers/webhooks.js';
import companyRouters from './routes/companyRoutes.js';
import connectcloudinary from './config/cloudinary.js';
import jobRoutes from './routes/jobRoutes.js';
import userRoutes from './routes/userRoutes.js';
import { clerkMiddleware } from '@clerk/express';
import bodyParser from 'body-parser';

dotenv.config();
await connectDB();
await connectcloudinary();

const app = express();

app.use(cors());
app.use(clerkMiddleware());

// ✅ Use raw body for webhooks BEFORE express.json() processes it
// app.post('/webhooks', bodyParser.raw({ type: '*/*' }), clerkWebhooks);

app.post('/webhooks',
  bodyParser.raw({ type: 'application/json' }),clerkWebhooks
)
app.use(express.json());
app.get('/', (req, res) => res.send('API Working for insideJobs'));
app.use('/api/company', companyRouters);
app.use('/api/jobs', jobRoutes);
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000;
// Sentry.setupExpressErrorHandler(app);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


