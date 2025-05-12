import React, { useState } from 'react';
import { checkIn, checkOut, getActiveTimeEntry } from "../Api/TimeEntry.ts";
import type { TimeEntryActionsProps } from "../Types/TimeEntry.ts";

// En komponent för att hantera tidsposter som exempelvis att checka in och checka ut
const TimeEntryActions: React.FC<TimeEntryActionsProps> = ({
    category,
    activeTimeEntry,
    categories,
    userId,
    onTimeEntryUpdated,
    onEditClick
}) => {
    const [error, setError] = useState('');

    const handleCheckIn = async () => {
        try {
            const checkActivity = await getActiveTimeEntry(userId);
            if (checkActivity.success && checkActivity.data) {
                alert('Du har redan checkat in i en kategori');
                onTimeEntryUpdated();
                return;
            }

            const response = await checkIn({
                userId,
                categoryId: category.categoryId
            });
            console.log('Check-in response:', response);
            onTimeEntryUpdated();
            alert('Check in lyckades');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to check in');
        }
    }

    const handleCheckOut = async () => {
        if (!activeTimeEntry) {
            alert('Ingen aktiv tidspost att checka ut från');
            return;
        }

        try {
            const entryId = activeTimeEntry.entryId;

            await checkOut({
                userId,
                categoryId: category.categoryId,
                entryId: entryId
            });

            onTimeEntryUpdated();
            alert('Check out lyckades');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to check out');
        }
    }

    return (
        <div className="action-buttons">
            {error && <div className="alert alert-error">{error}</div>}

            {activeTimeEntry ? (
                <div className="active-time-entry">
                    <h3>Aktiv tidsregistrering</h3>
                    <p>
                        Kategori: {categories.find(c => c.categoryId === activeTimeEntry.categoryId)?.name || 'Unknown'}
                    </p>
                    <p>
                        Startad: {new Date(activeTimeEntry.startTime).toLocaleString()}
                    </p>
                    <button className="check-out-button" onClick={handleCheckOut}>
                        Checka ut
                    </button>
                </div>
            ) : (
                <button className="check-in-button" onClick={handleCheckIn}>
                    Checka in
                </button>
            )}

            <button className="edit-button" onClick={onEditClick}>
                Redigera kategori
            </button>
        </div>
    );
};

export default TimeEntryActions;

