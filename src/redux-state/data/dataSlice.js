import { createSlice } from '@reduxjs/toolkit';
import expenseTypes from '../../constants/expenseTypes';

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

            const {viewType, viewValue, viewComment} = action.payload;

            if(viewType === 'income') {
                return;
            }

            const index = state.computed.findIndex(type => type.label === viewComment);

            if (index === -1) {
                const expense = expenseTypes.find(type => type.label === viewComment);
                expense.value = viewValue;
                
                state.computed.push(expense);
            } else {
                state.computed[index].value += viewValue;
            }
        }
    }
});

export const {setData, updateComputed} = dataReducer.actions;
export default dataReducer.reducer;
