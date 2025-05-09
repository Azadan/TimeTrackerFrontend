import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {getCategories, createCategory} from "../Api/Category.ts";
import {checkIn, checkOut, getCategoryStatistics, getActiveTimeEntry} from "../Api/TimeEntry.ts";
import type {Category} from "../Types/Category.ts";


const Dashboard: React.FC = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<any>(null);
    const [newCategoryName, setNewCategoryName] = useState('');
    const [showCategoryCreateForm, setShowCategoryCreateForm] = useState(false);
    const [newCategoryDescription, setNewCategoryDescription] = useState('');
    const [activeTimeEntry, setActiveTimeEntry] = useState<any>(0);
    const [statistics, setStatistics] = useState<any[]>([]);
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
        fetchCategoryStatistics();
        checkForActiveTimeEntry();
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
                    fetchCategoryStatistics(response.data[0].categoryId);
                }
            }
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to fetch categories');
        } finally {
            setLoading(false);
        }
    }

    const fetchCategoryStatistics = async () => {
        try {
            const response = await getCategoryStatistics(Number(userId));
            if (response.success) {
                setStatistics(response.data);
            }
        } catch (err) {
            setError('Failed to fetch statistics');
        }
    };


    const handleCategoryClick = (category: Category) => {
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

    const handleCheckIn = async () => {
        if (!selectedCategory) return
        try {
            const checkActivity = await getActiveTimeEntry(Number(userId));
            if (checkActivity.success && checkActivity.data) {
                setActiveTimeEntry(checkActivity.data);
                console.log('Active time entry:', checkActivity.data);
                alert('Du har redan checkat in i en kategori');
                return;
            }
            console.log('Checking in category:', selectedCategory);
            const response = await checkIn({
               userId : Number(userId),
               categoryId: selectedCategory.categoryId
            });
            console.log('Check-in response:', response);
            setActiveTimeEntry(response.data.entryId);
            alert('Check in lyckades');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to check in');
        }
    }

    const handleCheckOut = async () => {
        if (!selectedCategory) return

        if (!activeTimeEntry) {
            alert('Ingen aktiv tidspost att checka ut från');
            return;
        }
        try {
            console.log('Checking out category:', selectedCategory);
            const entryId = activeTimeEntry.entryId;

            await checkOut({
                userId : Number(userId),
                categoryId: selectedCategory.categoryId,
                entryId: entryId
            });
            setActiveTimeEntry(null);
            fetchCategoryStatistics();
            alert('Check out lyckades');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to check out');
        }
    }

    const checkForActiveTimeEntry = async () => {
        try {
            const response = await getActiveTimeEntry(Number(userId));
            if (response.success && response.data) {
                setActiveTimeEntry(response.data);

                const category = categories.find(c => c.categoryId === response.data.categoryId);
                if (category) {
                    setSelectedCategory(category);
                }
            } else {
                setActiveTimeEntry(null);
            }
        } catch (err) {
            console.error("Error checking for active time entry:", err);
        }
    };

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
                            {categories.map((category: Category) => {
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

                                    <div className="action-buttons">
                                        <button className="check-in-button" onClick={handleCheckIn}>Checka in</button>
                                        <button className="check-out-button" onClick={handleCheckOut}>Checka ut</button>
                                    </div>

                                    <div className="statistics-section">
                                        <h3>Din statistik</h3>
                                        {statistics && statistics.length > 0 ? (
                                            <ul className="statistics-list">
                                                {statistics.map((stat, index) => (
                                                    <li key={index} className="statistic-item">
                                                        <span className="statistic-name">{stat.categoryName} </span>
                                                        <span className="statistic-value">{stat.minutes}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        ) : (
                                            <p>Ingen statistik tillgänglig ännu</p>
                                        )}
                                    </div>
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