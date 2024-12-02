import { Request } from 'express';
import { Session } from 'express-session';

export interface CustomSession extends Session {
  user?: any; // Dodaj swoje własne pola, np. `user`
}

export interface CustomRequest extends Request {
  session: CustomSession; // Zaktualizowana sesja
}