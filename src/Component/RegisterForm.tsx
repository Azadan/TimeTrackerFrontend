import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {register} from "../Api/auth.ts";

const RegisterForm: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isAdmin] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSumbit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('');

        if (!email || !password) {
            setError('Please fill in all fields');
            return;
        }
        if (password.length < 8) {
            setError('Lösen måste vara minst 8 tecken lång');
            return;
        }

        setLoading(true);

        try {
            const response = await register({email, password, isAdmin});
            console.log(response);
            alert('Registrering lyckades');
            navigate('/');
        } catch (err: unknown) {
            const error = err as {response?: {data?: {message: string}}};
            setError(error.response?.data?.message || 'Failed registration')
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container">
            <h1 className="app-title">Timetracker</h1>

            <div className="card">
                <h2 className="title">Registrera dig</h2>

                {error && <div className="alert alert-error">{error}</div>}

                <form className="form" onSubmit={handleSumbit}>
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
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button
                        type="submit"
                        className="button"
                        disabled={loading}
                    >
                        {loading ? 'Registering...' : 'Register'}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default RegisterForm;