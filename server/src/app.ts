import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import jobRoutes from './routes/jobRoutes';
import applicationRoutes from './routes/applicationRoutes';
import dashboardRoutes from './routes/dashboardRoutes';
import { errorHandler } from './middleware/errorHandler';
import { swaggerSpec } from './swagger/config';
import { initializeDatabase } from './database/init';

dotenv.config();

const app = express();
app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173' }));
app.use(morgan('dev'));
app.use(express.json());

app.get('/',(req,res)=>res.json({message:"Server is running"}))
app.get('/health', (_req, res) => res.json({ status: 'ok' }));
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(errorHandler);

initializeDatabase().catch((err) => console.error('DB init failed', err));

export default app;