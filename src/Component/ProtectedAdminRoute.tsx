import { Navigate, Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import type { JwtPayload } from '../Types/auth.ts';

const ProtectedAdminRoute = () => {
    const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAdminStatus = () => {
            const token = localStorage.getItem('token');

            if (!token) {
                setIsAdmin(false);
                setLoading(false);
                return;
            }

            try {
                const decoded = jwtDecode<JwtPayload & { isAdmin?: boolean }>(token);
                setIsAdmin(!!decoded.isAdmin);
            } catch (error) {
                console.error('Error decoding token:', error);
                setIsAdmin(false);
            } finally {
                setLoading(false);
            }
        };

        checkAdminStatus();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return isAdmin ? <Outlet /> : <Navigate to="/dashboard" replace />;
};

export default ProtectedAdminRoute;