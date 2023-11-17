import { answerQuestion, getQuestion, getQuestions } from '../api';

export const GET_QUESTIONS = 'GET_QUESTIONS';
export const GET_QUESTIONS_SEARCH = 'GET_QUESTIONS_SEARCH';
export const GET_QUESTION_DETAILS = 'GET_QUESTION_DETAILS';
export const PUT_QUESTION_UPDATE = 'PUT_QUESTION_UPDATE';

const questionsReducer = (state = { questions: [], questionDetails: undefined }, action) => {
    switch (action.type) {
        case 'GET_QUESTIONS':
            return { ...state, questions: [...state.questions, ...action.payload.questions] };
        case 'GET_QUESTIONS_SEARCH':
            return { ...state, questions: action.payload.questions };
        case 'GET_QUESTION_DETAILS':
            return { ...state, questionDetails: action.payload.questionDetails };
        case 'PUT_QUESTION_UPDATE':
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

export const updateQuestionDetails = (questionId, content) => async (dispatch) => {
    try {
        const response = await answerQuestion(questionId, content);
        dispatch({
            type: PUT_QUESTION_UPDATE,
            payload: {
                questionDetails: response,
            },
        });
    } catch (error) {
        console.log(error);
    }
};

export default questionsReducer;
