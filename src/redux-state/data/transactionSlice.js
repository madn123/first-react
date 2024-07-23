import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    type: 'expense',
    value: '',
    comment: ''
}

export const transcationReducer = createSlice({
    name: 'transaction',
    initialState,
    reducers: {
        changeValue: (state, action) => {
            state[action.payload.key] = action.payload.value;
        },
    }
});

export const {changeViewType, changeValue, changeComment} = transcationReducer.actions;
export default transcationReducer.reducer;
