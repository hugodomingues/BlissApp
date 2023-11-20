import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CircularProgress, Button } from '@mui/material';
import { getStatusHealthRedux, retryRedux } from '../../reducers/health';
import { Navigate } from 'react-router-dom';
import { Cached } from '@mui/icons-material';

const HomePage = () => {
    const dispatch = useDispatch();
    const loading = useSelector((state) => state.healthStatus.loading);
    const health = useSelector((state) => state.healthStatus.health);

    useEffect(() => {
        dispatch(getStatusHealthRedux());
    }, [dispatch]);

    const retry = () => {
        dispatch(retryRedux());
        dispatch(getStatusHealthRedux());
    };

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
                    <div>
                        <h2>Cannot connect to the server. Please retry</h2>
                        <Button startIcon={<Cached />} variant="contained" color="error" onClick={retry}>
                            {' '}
                            Retry
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default HomePage;
