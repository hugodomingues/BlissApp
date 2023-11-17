import { createBrowserRouter } from 'react-router-dom';
import HomePage from '../components/HomePage';
import ListScreen from '../components/ListScreen';

const AppRoutes = createBrowserRouter([
    {
        path: '/',
        element: <HomePage />,
    },
    {
        path: '/questions',
        element: <ListScreen />,
    },
]);

export default AppRoutes;
