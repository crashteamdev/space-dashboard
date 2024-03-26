import { Categories } from "../types";

export const updateSubRows = (categories: Categories[], categoryId: number, tableArray: Categories[]): boolean => {
    for (let i = 0; i < categories.length; i++) {
        if (categories[i].id === categoryId) {
            if (!categories[i].subRows) {
                categories[i].subRows = tableArray;
            } else {
                const newSubRows = tableArray.filter(newRow => !categories[i].subRows.some(existingRow => existingRow.id === newRow.id));
                categories[i].subRows.push(...newSubRows);
            }
            return true;
        }
        if (categories[i].subRows && updateSubRows(categories[i].subRows, categoryId, tableArray)) {
            return true;
        }
    }
    return false;
};