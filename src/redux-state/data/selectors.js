import { createSelector } from "@reduxjs/toolkit";

export const selectTransactionType = state => state.transaction.type;
export const selectTransactionValue = state => state.transaction.value;
export const selectTransactionComment = state => state.transaction.comment;

export const selectAllData = state => state.data.all;
export const selectComputedData = state => state.data.computed;
export const selectActiveType = state => state.type;

export const selectUsers = state => state.user;
export const selectUser = state => state.user.choosed;

export const selectDataByFilter = createSelector(
    [selectAllData, selectActiveType, selectUser],
    (data, activeType, user) => {
        if(user && user.id && user.id !== 999) {
           data = data.filter(item => item.userId === user.id);
        }
        
        return activeType === 'all' ? data : data.filter(item => item.viewType === activeType);
    }
);

export const selectDataSum = createSelector(
    [selectDataByFilter, selectActiveType,],
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

export const selectDataSumByUser = createSelector(
    [selectAllData, (_, userId = null) => userId],
    (data, userId = null) => {
        let result = [];

        if(userId) {
            data = data.filter(item => item.userId === userId);
        }
        
        result = data.reduce((sum, item) => {
            if (item.viewType === 'income') {
                return {...sum, income:sum.income + +item.viewValue}
            } else {
                return {...sum, expense:sum.expense + +item.viewValue}
            }  
        }, {income:0,expense:0});
       
        return result;
    }
);

export const selectComputedDataByFilter = createSelector(
    [selectComputedData, selectUser],
    (data, user) => {
        if(user && user.id && user.id !== 999) {
           data = data.filter(item => item.userId === user.id);
        }
        
        return data;
    }
);


// export const selectDataByType2 = createSelector(
//     [selectAllData, selectActiveType],
//     (data, activeType) => {
//         const filterData = activeType == 'all' ? data : data.filter(item => item.viewType === activeType);

//         const filterDataSum = func ...

//         return {filterData:filterData, filterDataSum:filterDataSum}
//     }
// );