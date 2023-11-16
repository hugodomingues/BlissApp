import axios from 'axios';

const SERVER_LINK = 'https://private-anon-28ba604659-blissrecruitmentapi.apiary-mock.com';

export const getStatusHealth = async () => {
    return axios.get(`${SERVER_LINK}/health`).then((resp) => {
        return resp.data.status;
    });
};
