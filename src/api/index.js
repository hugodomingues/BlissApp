import axios from 'axios';

const SERVER_LINK = 'https://private-anon-28ba604659-blissrecruitmentapi.apiary-mock.com';

export const getStatusHealth = async () => {
    return axios.get(`${SERVER_LINK}/health`).then((resp) => {
        return resp.data.status;
    });
};

export const getQuestions = async (limit, offset, filter) => {
    return axios.get(`${SERVER_LINK}/questions?limit=${limit}&offset=${offset}&filter=${filter}`).then((resp) => {
        return resp.data;
    });
};
