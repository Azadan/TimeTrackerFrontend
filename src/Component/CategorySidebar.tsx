import React from 'react';
import type {CategorySidebarProps, Category} from "../Types/Category.ts";



// Komponent för att visa sidofältet med kategorier
const CategorySidebar: React.FC<CategorySidebarProps> = ({
    categories,
    selectedCategory,
    loading,
    showForm,
    onCategoryClick,
    onCreateClick
}) => {
    return (
        <div className="category-sidebar">
            {loading ? (
                <p>Laddar...</p>
            ) : categories.length === 0 ? (
                <p>Du har inga kategorier. Skapa din första kategori!</p>
            ) : (
                <ul className="category-list">
                    {categories.map((category: Category) => (
                        <li
                            key={category.categoryId}
                            className={
                                'category-item' +
                                (selectedCategory?.categoryId === category.categoryId ? ' selected' : '')
                            }
                            onClick={() => onCategoryClick(category)}
                        >
                            {category.name}
                        </li>
                    ))}
                </ul>
            )}

            <button
                className="create-button"
                onClick={onCreateClick}
            >
                {showForm ? 'Avbryt' : 'Skapa ny kategori'}
            </button>
        </div>
    );
};

export default CategorySidebar;
