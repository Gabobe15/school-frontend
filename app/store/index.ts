// ** Toolkit imports
import { configureStore } from '@reduxjs/toolkit';

// ** Reducers
import users from './users';
import students from './students';
import inertstudents from './inertstudents';
import inertuser from './inertuser';
import feepayment from './fees';

export const store = configureStore({
  reducer: {
    users,
    students,
    inertstudents,
    feepayment,
    inertuser,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
