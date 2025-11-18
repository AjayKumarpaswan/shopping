import { createSlice } from "@reduxjs/toolkit";

// Get current logged in user's ID
const getUserId = () => JSON.parse(localStorage.getItem("user"))?.id;

// Load cart for current user
const loadUserCart = () => {
  const userId = getUserId();
  if (!userId) return [];
  return JSON.parse(localStorage.getItem(`cart_${userId}`)) || [];
};

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: loadUserCart(),
  },
  reducers: {
    addToCart: (state, action) => {
      state.items.push(action.payload);
      const userId = getUserId();
      if (userId) {
        localStorage.setItem(`cart_${userId}`, JSON.stringify(state.items));
      }
    },
   removeFromCart: (state, action) => {
  state.items = state.items.filter((item) => item._id !== action.payload);
  const userId = getUserId();
  if (userId) {
    localStorage.setItem(`cart_${userId}`, JSON.stringify(state.items));
  }
},

   clearCartOnLogout: (state) => {
  state.items = [];
  const userId = getUserId();
  if (userId) {
    localStorage.removeItem(`cart_${userId}`);
  }
},

    loadCartOnLogin: (state) => {
      state.items = loadUserCart();
    },
  },
});

export const { addToCart, removeFromCart, clearCartOnLogout, loadCartOnLogin } =
  cartSlice.actions;

export default cartSlice.reducer;
