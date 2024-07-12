export const setLS = (key: string, value: string) => {
  localStorage.setItem(key, value);
};

export const removeItemLS = (key: string) => {
  localStorage.removeItem(key);
};
