import { getQuestion, getQuestions } from '../api';

export const GET_QUESTIONS = 'GET_QUESTIONS';
export const GET_QUESTIONS_SEARCH = 'GET_QUESTIONS_SEARCH';
export const GET_QUESTION_DETAILS = 'GET_QUESTION_DETAILS';

const questionsReducer = (state = { questions: [], questionDetails: undefined }, action) => {
    switch (action.type) {
        case 'GET_QUESTIONS':
            return { ...state, questions: [...state.questions, ...action.payload.questions] };
        case 'GET_QUESTIONS_SEARCH':
            return { ...state, questions: action.payload.questions };
        case 'GET_QUESTION_DETAILS':
            return { ...state, questionDetails: action.payload.questionDetails };
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

export const getQuestionDetails = (questionId) => async (dispatch) => {
    try {
        const response = await getQuestion(questionId);
        dispatch({
            type: GET_QUESTION_DETAILS,
            payload: {
                questionDetails: response,
            },
        });
    } catch (error) {
        console.error(error);
    }
};

export default questionsReducer;
