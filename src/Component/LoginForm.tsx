import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {login} from "../Api/auth.ts";
import {
    setAuthToken,
    getUserIdFromToken,
    setUserId,
    deleteAuthToken,
    isUserAdmin
} from "../Utilities/Auth.ts";


const LoginForm: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await login({email, password});
            const token : string = response.jwt;
            setAuthToken(token);
            const userId : number = getUserIdFromToken(token);
            setUserId(userId);
            const admin = isUserAdmin(token);
            console.log("Is admin:", admin);
            if (admin) {
                alert('Inloggning lyckades');
                navigate('/admin');
            } else {
                alert('Inloggning lyckades');
                navigate('/dashboard');
            }
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed login')
            deleteAuthToken();
        } finally {
            setLoading(false);
        }
    };

    const handleRegisterClick = () => {
        navigate('/register');
    }
    return (
        <div className="container">
            <h1 className="app-title">Timetracker Application</h1>

            <div className="card">
                <h2 className="title">Login</h2>

                {error && <div className="alert alert-error">{error}</div>}

                <form className="form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email" className="form-label">Email Address</label>
                        <input
                            className="form-input"
                            required
                            id="email"
                            name="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input
                            className="form-input"
                            required
                            name="password"
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div className="button-container">
                        <button
                            type="submit"
                            className="button"
                            disabled={loading}
                        >
                            {loading ? 'Logging in...' : 'Login'}
                        </button>

                        <button
                            type="button"
                            className="button"
                            onClick={handleRegisterClick}
                            disabled={loading}
                        >
                            Register
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;