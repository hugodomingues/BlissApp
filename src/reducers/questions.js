import { getQuestions } from '../api';

export const GET_QUESTIONS = 'GET_QUESTIONS';
export const GET_QUESTIONS_SEARCH = 'GET_QUESTIONS_SEARCH';

const questionsReducer = (state = { questions: [] }, action) => {
    switch (action.type) {
        case 'GET_QUESTIONS':
            return { questions: [...state.questions, ...action.payload.questions] };
        case 'GET_QUESTIONS_SEARCH':
            return { questions: action.payload.questions };

        default:
            return state;
    }
};

export const getQuestionsRedux = (limit, offset, filter) => async (dispatch) => {
    try {
        const response = await getQuestions(limit, offset, filter);
        dispatch({
            type: GET_QUESTIONS,
            payload: {
                questions: response,
            },
        });
    } catch (error) {
        console.error(error);
    }
};

export const getSearchQuestions = (limit, offset, filter) => async (dispatch) => {
    try {
        const response = await getQuestions(limit, offset, filter);
        dispatch({
            type: GET_QUESTIONS_SEARCH,
            payload: {
                questions: response,
            },
        });
    } catch (error) {
        console.error(error);
    }
};

export default questionsReducer;
