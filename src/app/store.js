import { configureStore } from "@reduxjs/toolkit";
import postsSlice from "../features/posts/postsSlice";
export default configureStore({
  reducer: {
    postsData: postsSlice
  },
});
