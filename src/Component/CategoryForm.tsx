import React, { useState, useEffect } from 'react';
import { createCategory, updateCategory } from "../Api/Category.ts";
import type {CategoryFormProps} from "../Types/Category.ts";;


// En komponent för att skapa och redigera kategorier
const CategoryForm: React.FC<CategoryFormProps> = ({
    userId,
    category,
    onSuccess,
    onCancel
}) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');
    const isEditing = !!category;

    useEffect(() => {
        if (category) {
            setName(category.name);
            setDescription(category.description);
        }
    }, [category]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            if (isEditing && category) {
                const response = await updateCategory(category.categoryId, {
                    name,
                    description,
                    userId
                });

                if (response.success) {
                    alert('Kategori uppdaterad!');
                    onSuccess();
                } else {
                    setError(response.message || 'Failed to update category');
                }
            } else {
                await createCategory({
                    userId,
                    name,
                    description,
                });
                onSuccess();
            }
        } catch (err: any) {
            setError(err.response?.data?.message || 'Operation failed');
        }
    };

    return (
        <div className="create-form-wrapper">
            {error && <div className="alert alert-error">{error}</div>}

            <form className="create-form" onSubmit={handleSubmit}>
                <h3>{isEditing ? 'Redigera kategori' : 'Skapa ny kategori'}</h3>
                <div className="form-group">
                    <label htmlFor="categoryName">Kategori: </label>
                    <input
                        type="text"
                        id="categoryName"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        placeholder="Ange kategori namn"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="categoryDescription">Beskrivning: </label>
                    <textarea
                        id="categoryDescription"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        placeholder="Ange kategori beskrivning"
                    />
                </div>
                <div className="form-actions">
                    <button type="submit" className="submit-button">
                        {isEditing ? 'Spara ändringar' : 'Skapa'}
                    </button>
                    <button type="button" className="cancel-button" onClick={onCancel}>
                        Avbryt
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CategoryForm;