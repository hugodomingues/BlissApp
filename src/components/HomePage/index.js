import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CircularProgress } from '@mui/material';
import { getStatusHealthRedux } from '../../reducers/health';
import { Navigate } from 'react-router-dom';

const HomePage = () => {
    const dispatch = useDispatch();
    const loading = useSelector((state) => state.healthStatus.loading);
    const health = useSelector((state) => state.healthStatus.health);

    useEffect(() => {
        dispatch(getStatusHealthRedux());
    }, [dispatch]);

    return (
        <div>
            <div>
                {loading ? (
                    <div>
                        <h3>Wait we are checking the server status</h3>
                        <CircularProgress />
                    </div>
                ) : health ? (
                    <Navigate to="/questions" replace={true} />
                ) : (
                    'reset button'
                )}
            </div>
        </div>
    );
};

export default HomePage;
