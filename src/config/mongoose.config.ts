import { MongooseModule } from '@nestjs/mongoose';
import * as dotenv from 'dotenv';
dotenv.config();
export const mongooseConfig = MongooseModule.forRoot(
  process.env.MONGODB_URI ,
  {
    retryAttempts: 3,
    retryDelay: 1000,
    connectionFactory: (connection) => {
      connection.on('connected', () => {
        console.log('MongoDB connected successfully');
      });
      connection.on('error', (err) => {
        console.error('MongoDB connection error:', err);
      });
      connection.on('disconnected', () => {
        console.log('MongoDB disconnected');
      });
      return connection;
    },
  },
);
