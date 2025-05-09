import React from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../Utilities/Auth.ts';

const LogoutButton: React.FC = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <button
            className="loggout-button"
            onClick={handleLogout}
        >
            Logga ut
        </button>
    );
};

export default LogoutButton;