import { Route, Redi, Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
    const isAuthenticated = localStorage.getItem('token');

    if (!isAuthenticated) return (
        <Navigate to={'/login'} />
    )

    return children;

};

export default PrivateRoute;
