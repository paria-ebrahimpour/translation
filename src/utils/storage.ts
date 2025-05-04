export const loadData = (): any | null => {
  try {
    const item = localStorage.getItem("translations-data");
    return item ? JSON.parse(item) : null;
  } catch (e) {
    return null;
  }
};

export const saveData = (data: any) => {
  localStorage.setItem("translations-data", JSON.stringify(data));
};
