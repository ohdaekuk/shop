import { createSlice } from '@reduxjs/toolkit';

const user = createSlice({
  name: 'user',
  initialState: { name: 'enzo', age: 28 },

  reducers: {
    updateName(state, action) {
      state.name = 'Enzo';
    },
    addAge(state, action) {
      action.payload ? (state.age += action.payload) : state.age++;
    },
  },
});

export const { updateName, addAge } = user.actions;

export default user;
