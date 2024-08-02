import { createSlice } from '@reduxjs/toolkit';
import expenseTypes from '../../constants/expenseTypes';
import { findIndexInObj } from '../../helpers/functions';

const initialState = {
    all: [],
    computed: [],
}

export const dataReducer = createSlice({
    name: 'data',
    initialState,
    reducers: {
        setData: (state, action) => {
            state.all.push(action.payload);

            const {viewType, viewValue, viewComment, userId} = action.payload;

            if(viewType === 'income') {
                return;
            }

            const index = state.computed.findIndex(type => type.label === viewComment && type.userId === userId);

            if (index === -1) {
                const expense = expenseTypes.find(type => type.label === viewComment);
                expense.value = viewValue;
                expense.userId = userId;
                
                state.computed.push(expense);
            } else {
                state.computed[index].value += viewValue;
            }
        },
        deleteData: (state, action) => {
            const allIndex = findIndexInObj('all', state.all, action.payload);
            
            if (allIndex !== -1) {
                state.all.splice(allIndex, 1);
            }

            const computedIndex = findIndexInObj('computed', state.computed, action.payload);
            
            if (computedIndex !== -1) {
                state.computed.splice(computedIndex, 1);
            }
        }
    }
});

export const {setData, deleteData} = dataReducer.actions;
export default dataReducer.reducer;
