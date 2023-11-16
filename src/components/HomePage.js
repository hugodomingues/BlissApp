import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CircularProgress } from '@mui/material';
import ListScreen from './ListScreen';
import { getStatusHealthRedux } from '../reducers/health';

const HomePage = () => {
    const dispatch = useDispatch();
    const loading = useSelector((state) => state.healthStatus.loading);
    const health = useSelector((state) => state.healthStatus.health);

    console.log(health);

    useEffect(() => {
        dispatch(getStatusHealthRedux());
    }, [dispatch]);

    return <div>{loading ? <CircularProgress /> : health ? <ListScreen /> : 'reset button'}</div>;
};

export default HomePage;
