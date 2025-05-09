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