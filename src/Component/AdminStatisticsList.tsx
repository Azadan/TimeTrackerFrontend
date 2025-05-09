import React from 'react';
import { StatisticsListProps } from '../../types/Statistics';

// Denna komponenten används för att visa en lista med statistik för olika kategorier i formaterad form
const StatisticsList: React.FC<StatisticsListProps> = ({ statistics }) => {
    const formatTime = (minutes: number): string => {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return `${hours}h ${mins}m`;
    };

    return (
        <ul className="category-stats-list">
            {statistics.length > 0 ? (
                statistics.map((stat, index) => (
                    <li key={index}>
                        {stat.categoryName}: {formatTime(stat.totalMinutes)}
                    </li>
                ))
            ) : (
                <li>No time entries</li>
            )}
        </ul>
    );
};

export default StatisticsList;

