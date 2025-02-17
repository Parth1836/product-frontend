import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the User state interface
interface UserState {
  userName: string;
  userId: number;
}

// Define the initial state
const initialState: UserState = {
  userName: '',
  userId: 0,
};

// Create the slice
const userSlice = createSlice({
  name: 'userSession',
  initialState,
  reducers: {
    // Action to set user
    setUser: (state, action: PayloadAction<UserState>) => {
      state.userName = action.payload.userName;
      state.userId = action.payload.userId;
    },
    // Action to reset user (example)
    resetUser: () => initialState,
  },
});

// Export actions
export const { setUser, resetUser } = userSlice.actions;

// Export the reducer (to be added to the store)
export default userSlice.reducer;
