import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllUsers } from "../Api/User";
import {getCategoryStatistics} from "../Api/TimeEntry.ts";
import type { UserStatistics } from "../Types/Statistics.ts";
import {StatisticsTable} from "./StatisticalTable.tsx";
import LogoutButton from "./Logout.tsx";


// En komponent för att hantera instrumentpanelen för administratörer där de kan se statistik för alla användare
const AdminDashboard: React.FC = () => {
    const [userStatistics, setUserStatistics] = useState<UserStatistics[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        // Check if user is admin
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
            return;
        }

        fetchData();
    }, [navigate]);

    const fetchData = async () => {
        try {
            setLoading(true);
            const usersResponse = await getAllUsers();

            if (usersResponse.success && usersResponse.data) {

                const userStatsPromises = usersResponse.data.map(async (user: any) => {
                    try {
                        const statsResponse = await getCategoryStatistics(user.id);


                        const categories = statsResponse.success && statsResponse.data
                            ? statsResponse.data.map((stat: any) => ({
                                categoryName: stat.categoryName,
                                totalMinutes: parseMinutesFromString(stat.minutes)
                            }))
                            : [];

                        const totalMinutes = categories.reduce(
                            (total: number, category: any) => total + category.totalMinutes,
                            0
                        );

                        return {
                            userId: user.userId,
                            email: user.email,
                            categories: categories,
                            totalTimeTracked: totalMinutes
                        };
                    } catch (error) {
                        console.error(`Error fetching statistics for user ${user.id}:`, error);
                        return {
                            userId: user.userId,
                            email: user.email,
                            categories: [],
                            totalTimeTracked: 0
                        };
                    }
                });

                const userStats = await Promise.all(userStatsPromises);
                setUserStatistics(userStats);
            }
        } catch (err: any) {
            setError(err.message || "Failed to fetch data");
        } finally {
            setLoading(false);
        }
    };

    const parseMinutesFromString = (timeString: string): number => {
        const hoursMatch = timeString.match(/(\d+)h/);
        const minutesMatch = timeString.match(/(\d+)m/);

        const hours = hoursMatch ? parseInt(hoursMatch[1]) : 0;
        const minutes = minutesMatch ? parseInt(minutesMatch[1]) : 0;

        return hours * 60 + minutes;
    };


    return (
        <div className="admin-dashboard-container">
            <div className="header-container">
                <h1>Admin Dashboard</h1>
                <LogoutButton />
            </div>

            {error && <div className="error-message">{error}</div>}

            {loading ? (
                <div className="loading">Laddar all statistik...</div>
            ) : (
                <div className="statistics-container">
                    <h2>Alla användarens statistik</h2>
                    <StatisticsTable
                        statistics={userStatistics}
                    />
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;