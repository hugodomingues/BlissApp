import { configureStore } from '@reduxjs/toolkit';

import healthStatusReducer from './reducers/health';
import questionsReducer from './reducers/questions';

const store = configureStore({
    reducer: {
        healthStatus: healthStatusReducer,
        questions: questionsReducer,
    },
});

export default store;
