import { configureStore } from '@reduxjs/toolkit';

import healthStatusReducer from './reducers/health';

const store = configureStore({
    reducer: {
        healthStatus: healthStatusReducer,
    },
});

export default store;
