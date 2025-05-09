import React from 'react';
import { checkIn, checkOut } from "../Api/TimeEntry.ts";
import type { Category } from "../Types/Category.ts";
import TimeEntryActions from './TimeEntryActions';
import StatisticsList from './StatisticsList';
import type { CategoryDetailsProps } from "../Types/Category.ts";

// En komponent för att visa detaljer om en kategori
const CategoryDetails: React.FC<CategoryDetailsProps> = ({
    category,
    activeTimeEntry,
    statistics,
    categories,
    userId,
    onEditClick,
    onTimeEntryUpdated
 }) => {
    if (!category) {
        return <p>Vänligen välj en kategori för att se detaljer.</p>;
    }

    return (
        <div className="category-details">
            <h2>{category.name}: </h2>
            <p className="category-description">{category.description}</p>

            <TimeEntryActions
                category={category}
                activeTimeEntry={activeTimeEntry}
                categories={categories}
                userId={userId}
                onTimeEntryUpdated={onTimeEntryUpdated}
                onEditClick={onEditClick}
            />

            <StatisticsList statistics={statistics} />
        </div>
    );
};

export default CategoryDetails;
