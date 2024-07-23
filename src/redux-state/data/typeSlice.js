import { createSlice } from '@reduxjs/toolkit';

const initialState = 'all';

const typeSlice = createSlice({
    name: 'type',
    initialState,
    reducers: {
        changeType: (_, action) => action.payload,
    },
});

export const { changeType } = typeSlice.actions;

export default typeSlice.reducer;