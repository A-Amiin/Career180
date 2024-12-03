import { createSlice } from "@reduxjs/toolkit";
import { fetchPostById, fetchPosts, addPost, updatePost, deletePost } from "../../network/postsApis";

export const postsSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    status: "idle", // أو "loading", "succeeded", "failed"
    error: null,
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get the list of posts
      .addCase(fetchPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // Get the one of posts
      .addCase(fetchPostById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPostById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.posts = action.payload;
      })
      .addCase(fetchPostById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // Adding Post   
      .addCase(addPost.fulfilled, (state, action) => {
        state.posts.push(action.payload);
      })
      // Update Post
      .addCase(updatePost.fulfilled, (state, action) => {
        const updatedPost = action.payload;
        const index = state.posts.findIndex((post) => post.id === updatedPost.id);
        if (index !== -1) {
          state.posts[index] = updatedPost;
        }
      })
      // Delete The Post
      .addCase(deletePost.fulfilled, (state, action) => {
        state.posts = state.posts.filter((post) => post.id !== action.payload);
      });
  },
});

export { fetchPostById, fetchPosts, addPost, updatePost, deletePost };
export default postsSlice.reducer;