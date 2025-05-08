import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {getCategories, createCategory} from "../Api/Category.ts";

const Dashboard: React.FC = () => {
    const [categories, setCategories] = useState<any[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<any>(null);
    const [newCategoryName, setNewCategoryName] = useState('');
    const [showCategoryCreateForm, setShowCategoryCreateForm] = useState(false);
    const [newCategoryDescription, setNewCategoryDescription] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (!userId) {
            navigate('/login');
        }
        fetchCategories();
    }, [userId, navigate]);

    const fetchCategories = async () => {
        try {
            setLoading(true);
            const response = await getCategories(Number(userId));
            let categories = response.data || [];
            if (response.success && response.data) {
                setCategories(response.data);

                if (response.data.length > 0) {
                    setSelectedCategory(response.data[0]);
                }
            }
        } catch (err:any) {
            setError(err.response?.data?.message || 'Failed to fetch categories');
        } finally {
            setLoading(false);
        }
    }

    const handleCategoryClick = (category: any) => {
        setSelectedCategory(category);
    }



return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <h1>Din Dashboard</h1>
                <button className="logout">Logga ut</button>
            </header>

            {error && <div className="alert alert-error">{error}</div>}

            <div className="dashboard-content">
                <div className="category-sidebar">
                    <h2>Dina kategorier</h2>
                    {loading ? (
                        <p>Laddar...</p>
                    ) : categories.length === 0 ? (
                        <p>Du har inga kategorier. Skapa din första kategori!</p>
                    ) : (
                        <ul className="category-list">
                            {categories.map((category) => (
                                <li
                                    key={category.categoryId}
                                    className={
                                        'category-item' +
                                        (selectedCategory?.categoryId === category.categoryId ? ' selected' : '')
                                    }
                                    onClick={() => handleCategoryClick(category)}
                                >
                                    {category.categoryName}
                                </li>
                            ))}
                        </ul>
                    )}
                    <button
                        className="create-button"
                        onClick={() => setShowCategoryCreateForm(!showCategoryCreateForm)}
                    >
                    </button>
                </div>
            </div>
        </div>
    );
}



export default Dashboard;