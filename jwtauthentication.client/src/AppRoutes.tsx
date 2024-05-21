import Home from "./Views/Home";
import Login from "./Views/Login";
import Register from "./Views/Register";

const AppRoutes = [
    {
        index: true,
        element: <Home />,
        name: 'home',
        requiresAuth: true
    },
    {
        path: 'register',
        element: <Register />,
        name: 'register'
    },
    {
        path: 'login',
        element: <Login />,
        name: 'login'
    }
];

export default AppRoutes;