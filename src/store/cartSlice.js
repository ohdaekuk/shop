import { createSlice } from '@reduxjs/toolkit';

const cart = createSlice({
  name: 'cart',
  initialState: [
    { id: 0, name: 'White and Black', count: 2 },
    { id: 1, name: 'Red Knit', count: 1 },
  ],

  reducers: {
    updateCount(state, action) {
      state.forEach((item) => {
        if (item.id === action.payload) {
          item.count++;
        }
      });
    },
    addContent(state, action) {
      let cartData = {
        id: action.payload.id,
        name: action.payload.title,
        count: action.payload.count
          ? action.payload.count
          : (Math.random(20) * 100).toFixed(0),
      };

      const index = state.findIndex((item) => item.name === cartData.name);

      if (action.payload.count) {
        index === -1
          ? state.push(cartData)
          : (state[index].count += Number(action.payload.count));
      } else {
        index === -1 ? state.push(cartData) : state[index].count++;
      }
    },

    removeContent(state, action) {
      state.splice(action.payload, 1);
    },
    removeContents(state, action) {
      action.payload.forEach((index) => {
        const deleteIndex = state.findIndex(
          (item) => item.id === Number(index),
        );

        if (deleteIndex === -1) {
          return;
        } else {
          state.splice(deleteIndex, 1);
        }
      });
    },
  },
});

export const { updateCount, addContent, removeContent, removeContents } =
  cart.actions;

export default cart;
