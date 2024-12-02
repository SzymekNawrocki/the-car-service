import { Request } from 'express';
import { Session } from 'express-session';

export interface CustomSession extends Session {
  user?: any; 
}

export interface CustomRequest extends Request {
  session: CustomSession; 
}