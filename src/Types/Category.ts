export type createCategoryRequest = {
    name: string
    description: string
    userId: number
}

export type Category = {
    categoryId: number
    name: string
    description: string
    userId: number
}

export type CategorySidebarProps = {
    categories: Category[];
    selectedCategory: Category | null;
    loading: boolean;
    showForm: boolean;
    onCategoryClick: (category: Category) => void;
    onCreateClick: () => void;
}

export type CategoryFormProps = {
    userId: number;
    category: Category | null;
    onSuccess: () => void;
    onCancel: () => void;
}

export type CategoryDetailsProps = {
    category: Category | null;
    activeTimeEntry: any;
    statistics: any[];
    categories: Category[];
    userId: number;
    onEditClick: () => void;
    onTimeEntryUpdated: () => void;
}
