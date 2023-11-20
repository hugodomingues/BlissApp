import { getStatusHealth } from '../api';

export const SET_HEALTH = 'SET_HEALTH';

const healthStatusReducer = (state = { loading: true, health: undefined }, action) => {
    switch (action.type) {
        case 'SET_HEALTH':
            return { loading: action.payload.loading, health: action.payload.health, state };
        default:
            return state;
    }
};

export const getStatusHealthRedux = () => async (dispatch) => {
    try {
        let auxHealth = false;
        const response = await getStatusHealth();

        if (response === 'OK') {
            auxHealth = true;
        }
        dispatch({
            type: SET_HEALTH,
            payload: {
                loading: false,
                health: auxHealth,
            },
        });
    } catch (error) {
        console.error(error);
    }
};

export const retryRedux = () => async (dispatch) => {
    try {
        dispatch({
            type: SET_HEALTH,
            payload: {
                loading: true,
                auxHealth: undefined,
            },
        });
    } catch (error) {
        console.error(error);
    }
};

export default healthStatusReducer;
