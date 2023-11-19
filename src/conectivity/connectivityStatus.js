import React from 'react';
import useNetworkStatus from './useNetworkStatus';
import { Box, Typography } from '@mui/material';
import { WifiOff } from '@mui/icons-material';

const ConnectivityStatus = () => {
    const isOnline = useNetworkStatus();

    return (
        <div
            style={{
                display: isOnline ? 'none' : 'block',
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: '#f44336',
                color: 'white',
                textAlign: 'center',
                paddingTop: '20vh',
            }}
        >
            <Box>
                <WifiOff sx={{ fontSize: 60 }} />
                <Typography variant="h5" gutterBottom>
                    No Internet Connection
                </Typography>
                <Typography variant="body2">Please check your internet connection and try again.</Typography>
            </Box>
        </div>
    );
};

export default ConnectivityStatus;
