import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import ConnectivityStatus from './conectivity/connectivityStatus';
import useNetworkStatus from './conectivity/useNetworkStatus';
import { RouterProvider } from 'react-router-dom';
import AppRoutes from './Router/routes';
import NavBar from './components/Navbar';
import './App.css';

const queryClient = new QueryClient();

const App = () => {
    const isOnline = useNetworkStatus();

    return (
        <QueryClientProvider client={queryClient}>
            <ConnectivityStatus />
            {isOnline ? (
                <NavBar>
                    <RouterProvider router={AppRoutes} />
                </NavBar>
            ) : null}
        </QueryClientProvider>
    );
};

export default App;
