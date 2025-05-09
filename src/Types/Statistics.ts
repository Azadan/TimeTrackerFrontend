export type StatisticsListProps = {
    statistics: any[];
}

export type UserStatistics = {
    userId: number;
    email: string;
    categories: {
        categoryName: string;
        totalMinutes: number;
    }[];
    totalTimeTracked: number;
};


export type StatisticsTableProps = {
    statistics: UserStatistics[];
}
