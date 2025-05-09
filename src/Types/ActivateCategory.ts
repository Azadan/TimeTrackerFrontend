export type CheckInRequest = {
    userId: number
    categoryId: number
}

export type CheckoutRequest = {
    userId: number
    categoryId: number
    entryId: number
}