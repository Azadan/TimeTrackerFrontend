import React from 'react';
import type { StatisticsTableProps } from "../Types/Statistics.ts";
import StatisticsList from './StatisticsList';

export const StatisticsTable: React.FC<StatisticsTableProps> = ({ statistics }) => {
    const formatTime = (minutes: number): string => {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return `${hours}h ${mins}m`;
    };

    return (
        <table className="statistics-table">
            <thead>
            <tr>
                <th>Användare</th>
                <th>Kategori</th>
                <th>Statistik</th>
            </tr>
            </thead>
            <tbody>
            {statistics.map((userStat) => (
                <tr key={userStat.userId}>
                    <td>{userStat.email}</td>
                    <td>
                        <StatisticsList statistics={userStat.categories} />
                    </td>
                    <td>{formatTime(userStat.totalTimeTracked)}</td>
                </tr>
            ))}
            </tbody>
        </table>
    );
};

export default StatisticsTable;