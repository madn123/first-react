import { createSlice } from '@reduxjs/toolkit';
import expenseTypes from '../../constants/expenseTypes';

const initialState = {
    data: [],
    computed: [],
}

export const dataReducer = createSlice({
    name: 'dataReducer',
    initialState,
    reducers: {
        setData: (state, action) => {
            state.data.push(action.payload);
        },
        updateComputed: (state, action) => {
            const {viewType, viewValue, viewComment} = action.payload;

            if(viewType === 'доход') {
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
