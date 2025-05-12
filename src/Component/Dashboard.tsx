import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCategories } from "../Api/Category.ts";
import { getCategoryStatistics, getActiveTimeEntry } from "../Api/TimeEntry.ts";
import type { Category } from "../Types/Category.ts";
import CategorySidebar from "./CategorySidebar.tsx";
import CategoryForm from "./CategoryForm.tsx";
import CategoryDetails from "./CategoryDetails.tsx";
import LogoutButton from "./Logout.tsx";

// En komponent för att hantera instrumentpanelen där användaren kan se och hantera sina kategorier samt se sin statistik

const Dashboard: React.FC = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
    const [showCategoryCreateForm, setShowCategoryCreateForm] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [activeTimeEntry, setActiveTimeEntry] = useState<any>(null);
    const [statistics, setStatistics] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const userId = localStorage.getItem('userId');

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
            if (response.success && response.data) {
                setCategories(response.data);

                if (response.data.length > 0) {
                    setSelectedCategory(response.data[0]);
                    fetchCategoryStatistics();
                }
            }
        } catch (err: any) {
            console.error(err.response?.data?.message || 'Failed to fetch categories');
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
        } catch (err: any) {
            console.error(err.response?.data?.message || 'Failed to fetch category statistics');
        }
    };

    const handleCategoryClick = (category: Category) => {
        setSelectedCategory(category);
    }

    const toggleCategoryForm = (editing: boolean = false) => {
        setShowCategoryCreateForm(!showCategoryCreateForm);
        setIsEditing(editing);
    };

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

    const handleCategoryUpdated = () => {
        fetchCategories();
        setShowCategoryCreateForm(false);
        setIsEditing(false);
    };

    const handleTimeEntryUpdated = () => {
        checkForActiveTimeEntry();
        fetchCategoryStatistics();
    };

    return (
        <div className="dashboard-container">
            <div className="header-container">
                <h2>Dina kategorier</h2>
                <LogoutButton />
            </div>

            <div className="dashboard-layout">
                <CategorySidebar
                    categories={categories}
                    selectedCategory={selectedCategory}
                    loading={loading}
                    onCategoryClick={handleCategoryClick}
                    onCreateClick={() => toggleCategoryForm(false)}
                    showForm={showCategoryCreateForm}
                />

                <div className="content-container">
                    {showCategoryCreateForm ? (
                        <CategoryForm
                            userId={Number(userId)}
                            category={isEditing ? selectedCategory : null}
                            onSuccess={handleCategoryUpdated}
                            onCancel={() => toggleCategoryForm()}
                        />
                    ) : (
                        <CategoryDetails
                            category={selectedCategory}
                            activeTimeEntry={activeTimeEntry}
                            statistics={statistics}
                            categories={categories}
                            userId={Number(userId)}
                            onEditClick={() => toggleCategoryForm(true)}
                            onTimeEntryUpdated={handleTimeEntryUpdated}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}

export default Dashboard;