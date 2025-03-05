export const setLocalStorage = (key: string, data: unknown) => {
    localStorage.setItem(key, JSON.stringify(data));
};

export const getLocalStorage = (key: string) => {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : null;
};

export const clearLocalStorage = () => {
    localStorage.clear();
};
