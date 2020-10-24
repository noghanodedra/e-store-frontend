import { AuthEffects, authReducer } from './auth';

export * from './auth';

export const appReducer = {
  auth: authReducer,
};

export const appEffects = [AuthEffects];
