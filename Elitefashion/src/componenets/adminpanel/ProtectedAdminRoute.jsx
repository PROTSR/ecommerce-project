import React, { useContext } from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { ThemData } from '../../contex/Theme';

const ProtectedAdminRoute = () => {
    const navigate = useNavigate()
    const {adminToken}= useContext(ThemData)
    // const AdminToken = localStorage.getItem('adminToken');

    // Allow access only if logged in AND role is admin
    if (adminToken) {
        return <Outlet />;
    }

    // Redirect non-admins or unauthenticated users to admin login
    return navigate('/');
};

export default ProtectedAdminRoute;