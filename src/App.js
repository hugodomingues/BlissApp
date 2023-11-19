import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import ConnectivityStatus from './conectivity/connectivityStatus';
import useNetworkStatus from './conectivity/useNetworkStatus';
import { RouterProvider } from 'react-router-dom';
import AppRoutes from './Router/routes';

const queryClient = new QueryClient();

const App = () => {
    const isOnline = useNetworkStatus();

    return (
        <QueryClientProvider client={queryClient}>
            <ConnectivityStatus />
            {isOnline && <RouterProvider router={AppRoutes} />}
        </QueryClientProvider>
    );
};

export default App;
