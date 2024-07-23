import { createSelector } from "@reduxjs/toolkit";

export const selectTransactionType = state => state.transaction.type;
export const selectTransactionValue = state => state.transaction.value;
export const selectTransactionComment = state => state.transaction.comment;

export const selectAllData = state => state.data.all;
export const selectComputedData = state => state.data.computed;
export const selectActiveType = state => state.type;

export const selectDataByType = createSelector(
    [selectAllData, selectActiveType],
    (data, activeType) => activeType == 'all' ? data : data.filter(item => item.viewType === activeType)
);

export const selectDataSum = createSelector(
    [selectDataByType, selectActiveType],
    (data, activeType) => {
        let result = [];

        if (activeType === 'all') {
            result = data.reduce((sum, item) => {
                if (item.viewType === 'income') {
                    return sum + +item.viewValue;
                } else {
                    return sum - +item.viewValue;
                }  
            }, 0);
        } else {
            result = data.reduce((sum, item) => {
                return sum + +item.viewValue;
            }, 0);
        }
       
        return result;
    }
);

export const selectUsers = state => state.user;

// export const selectDataByType2 = createSelector(
//     [selectAllData, selectActiveType],
//     (data, activeType) => {
//         const filterData = activeType == 'all' ? data : data.filter(item => item.viewType === activeType);

//         const filterDataSum = func ...

//         return {filterData:filterData, filterDataSum:filterDataSum}
//     }
// );