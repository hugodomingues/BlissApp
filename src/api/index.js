import axios from 'axios';

const SERVER_LINK = 'https://private-anon-28ba604659-blissrecruitmentapi.apiary-mock.com';

export const getStatusHealth = async () => {
    return axios
        .get(`${SERVER_LINK}/health`)
        .then((resp) => {
            return resp.data.status;
        })
        .catch((error) => console.log(error));
};

export const getQuestions = async (limit, offset, filter) => {
    return axios
        .get(`${SERVER_LINK}/questions?limit=${limit}&offset=${offset}&filter=${filter}`)
        .then((resp) => {
            return resp.data;
        })
        .catch((error) => console.log(error));
};

export const getQuestion = async (questionId) => {
    return axios
        .get(`${SERVER_LINK}/questions/${questionId}`)
        .then((resp) => {
            return resp.data;
        })
        .catch((error) => console.log(error));
};

export const answerQuestion = async (questionId, content) => {
    return axios
        .put(`${SERVER_LINK}/questions/${questionId}`, content)
        .then((resp) => {
            return resp.data;
        })
        .catch((error) => console.log(error));
};

export const sendEmail = async (email, content_url) => {
    return axios
        .post(`${SERVER_LINK}/share?destination_email=${email}&=content_url=${content_url}`)
        .then((resp) => console.log(resp))
        .catch((error) => console.error(error));
};
