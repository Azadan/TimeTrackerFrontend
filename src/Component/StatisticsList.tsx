import react from 'react';
import type {StatisticsListProps} from "../Types/Statistics.ts";

const StatisticsList: React.FC<StatisticsListProps> = ({ statistics }) => {
    return (
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
    );
};

export default StatisticsList;