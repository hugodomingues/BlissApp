import { createBrowserRouter } from 'react-router-dom';
import HomePage from '../components/HomePage';
import ListScreen from '../components/ListScreen';
import DetailsPage from '../components/DetailsPage';

const AppRoutes = createBrowserRouter([
    {
        path: '/',
        element: <HomePage />,
    },
    {
        path: '/questions',
        element: <ListScreen />,
    },
    {
        path: '/questions/:questionId',
        element: <DetailsPage />,
    },
]);

export default AppRoutes;
