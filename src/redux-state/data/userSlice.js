import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    choosed: {},
}

export const userReducer = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.choosed = action.payload;
        }
    }
});

export const { setUser } = userReducer.actions;
export default userReducer.reducer;
