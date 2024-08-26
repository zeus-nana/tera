import AppError from './utils/appError';
import express, { NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import globalErrorHandler from './controllers/errorController';
import authRoutes from './routes/authRoutes';
import adminRoutes from './routes/adminRoutes';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';

// @ts-ignore
import xss from 'xss-clean';
import hpp from 'hpp';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/userRoutes';

// Loading of the environment variables in config.env file.
dotenv.config({ path: './config.env' });

/*// Host address.
const host: any = process.env.API_HOST || '127.0.0.1';
// Port used by the API.
const port: any = process.env.API_PORT || 3333;*/

const app = express();

// MIDDLEWARES

// Sets the security HTTP headers.
app.use(helmet());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Limit requests from the same IP/
const limiter = rateLimit({
  limit: 1000,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!',
});

app.use('/api', limiter);

// Body parser, reading data from body into req.body.
app.use(express.json());

// Specifies the API to use CORS to prevent XSS attacks.
app.use(
  cors({
    origin: 'http://localhost:5173', // L'URL de votre frontend
    credentials: true, // Permet l'envoi de cookies
  }),
);

// Ajouter le cookie-parser ici
app.use(cookieParser());

app.use((req: Request, res: Response, next: NextFunction) => {
  // console.log(req.headers);
  next();
});

// Data sanitization against XSS attacks
app.use(xss());

app.use(hpp());

app.use((req: Request, res: Response, next: NextFunction) => {
  // console.log(req.headers);
  next();
});

// ROUTES
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/admin', adminRoutes);
app.use('/api/v1/users', userRoutes);

// UNHANDLED ROUTE
app.all('*', (req: Request, res: Response, next: NextFunction) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// GLOBAL ERROR HANDLER
app.use(globalErrorHandler);

export default app;
