import type {Category} from "./Category.ts";

export type TimeEntryActionsProps = {
    category: Category;
    activeTimeEntry: any;
    categories: Category[];
    userId: number;
    onTimeEntryUpdated: () => void;
    onEditClick: () => void;
}