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
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to fetch categories');
        } finally {
            setLoading(false);
        }
    }

    const handleCategoryClick = (category: any) => {
        setSelectedCategory(category);
    }

    const handleCreateCategory = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await createCategory({
                userId: Number(userId),
                name: newCategoryName,
                description: newCategoryDescription,
            });
            setNewCategoryName('');
            setNewCategoryDescription('');
            setShowCategoryCreateForm(false);
            fetchCategories();
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to create category');
        }
    }

    return (
        <div className="dashboard-container">
            <h2>Dina kategorier</h2>

            <div className="dashboard-layout">
                <div className="category-sidebar">
                    {loading ? (
                        <p>Laddar...</p>
                    ) : categories.length === 0 ? (
                        <p>Du har inga kategorier. Skapa din första kategori!</p>
                    ) : (
                        <ul className="category-list">
                            {categories.map((category) => {
                                console.log('Category object:', category);

                                return (
                                    <li
                                        key={category.categoryId}
                                        className={
                                            'category-item' +
                                            (selectedCategory?.categoryId === category.categoryId ? ' selected' : '')
                                        }
                                        onClick={() => handleCategoryClick(category)}
                                    >
                                        {category.name}
                                    </li>
                                );
                            })}
                        </ul>
                    )}

                    <button
                        className="create-button"
                        onClick={() => setShowCategoryCreateForm(!showCategoryCreateForm)}
                    >
                        {showCategoryCreateForm ? 'Avbryt' : 'Skapa ny kategori'}
                    </button>
                </div>


                <div className="content-container">
                    {showCategoryCreateForm && (
                        <div className="create-form-wrapper">
                            <form className="create-form" onSubmit={handleCreateCategory}>
                                <div className="form-group">
                                    <label htmlFor="categoryName">Kategori: </label>
                                    <input
                                        type="text"
                                        id="categoryName"
                                        value={newCategoryName}
                                        onChange={(e) => setNewCategoryName(e.target.value)}
                                        required
                                        placeholder="Ange kategori namn"
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="categoryDescription">Beskrivning: </label>
                                    <textarea
                                        id="categoryDescription"
                                        value={newCategoryDescription}
                                        onChange={(e) => setNewCategoryDescription(e.target.value)}
                                        required
                                        placeholder="Ange kategori beskrivning"
                                    />
                                </div>
                                <button type="submit" className="submit-button">Skapa</button>
                            </form>
                        </div>
                    )}

                    {!showCategoryCreateForm && (
                        <div className="category-details">
                            {selectedCategory ? (
                                <>
                                    <h2>{selectedCategory.name}: </h2>
                                    <p className="category-description">{selectedCategory.description}</p>
                                </>
                            ) : (
                                <p>Vänligen välj en kategori för att se detaljer.</p>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}


export default Dashboard;