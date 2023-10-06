import { createSlice } from '@reduxjs/toolkit';

const cart = createSlice({
  name: 'cart',
  initialState: {
    product: [
      { id: 0, name: 'White and Black', count: 2 },
      { id: 1, name: 'Red Knit', count: 1 },
      { id: 2, name: 'Grey Yordan', count: 3 },
    ],
    recentProductInfo: [],
  },

  reducers: {
    updateCount(state, action) {
      state.product.forEach((item) => {
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

      const index = state.product.findIndex(
        (item) => item.name === cartData.name,
      );

      if (action.payload.count) {
        index === -1
          ? state.product.push(cartData)
          : (state.product[index].count += Number(action.payload.count));
      } else {
        index === -1
          ? state.product.push(cartData)
          : state.product[index].count++;
      }
    },

    removeContent(state, action) {
      state.product.splice(action.payload, 1);
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
    getItemInfo(state, action) {
      let itemInfoArr = [];
      let itemInfoObj = {};

      state.product.forEach((item) => {
        const index = action.payload.findIndex((find) => item.id === find);

        if (index !== -1) {
          itemInfoObj = {
            name: item.name,
            id: item.id,
          };

          itemInfoArr.push(itemInfoObj);
        }
      });

      state.recentProductInfo = itemInfoArr;
    },
  },
});

export const {
  updateCount,
  addContent,
  removeContent,
  removeContents,
  getItemInfo,
} = cart.actions;

export default cart;
