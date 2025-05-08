export const setAuthToken = (token: string) :void => {
    localStorage.setItem('token', token);
}
export const getAuthToken = (): string | null => {
    return localStorage.getItem('token');
}

export const deleteAuthToken = () :void => {
    localStorage.removeItem('token');
}

export const isAuthenticated = (): boolean => {
    const token = getAuthToken();
    return token !== null;
}

