import { createSlice } from "@reduxjs/toolkit";

// Get current logged in user's ID
const getUserId = () => JSON.parse(localStorage.getItem("user"))?.id;

// Load wishlist for current user
const loadUserWishlist = () => {
  const userId = getUserId();
  if (!userId) return [];
  return JSON.parse(localStorage.getItem(`wishlist_${userId}`)) || [];
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    items: loadUserWishlist(),
  },
  reducers: {
    addToWishlist: (state, action) => {
      state.items.push(action.payload);
      const userId = getUserId();
      if (userId) {
        localStorage.setItem(`wishlist_${userId}`, JSON.stringify(state.items));
      }
    },
   removeFromWishlist: (state, action) => {
  // Use _id to match the item
  state.items = state.items.filter((item) => item._id !== action.payload);
  const userId = getUserId();
  if (userId) {
    localStorage.setItem(`wishlist_${userId}`, JSON.stringify(state.items));
  }
},

    clearWishlistOnLogout: (state) => {
      state.items = [];
    },
    loadWishlistOnLogin: (state) => {
      state.items = loadUserWishlist();
    },
  },
});

export const {
  addToWishlist,
  removeFromWishlist,
  clearWishlistOnLogout,
  loadWishlistOnLogin,
} = wishlistSlice.actions;

export default wishlistSlice.reducer;
