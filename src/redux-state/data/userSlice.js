import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


export const fetchUsers = createAsyncThunk(
    'user/fetchUsers',
    async () => {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const data = await response.json();
        return data;
    },
);

const initialState = {
    users: [],
    loading: false,
    error: null,
    choosed: {},
}

export const userReducer = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.choosed = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export const { setUser } = userReducer.actions;
export default userReducer.reducer;
