import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts, addPost, updatePost, deletePost } from "./postsSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";
import * as Yup from "yup";
import { useFormik } from "formik";
import "react-toastify/dist/ReactToastify.css";
import "./style.css";
import { useNavigate } from "react-router-dom";

const validationSchema = Yup.object({
  title: Yup.string()
    .required("Please enter a title")
    .max(25, "the maximum title length is 25 characters")
    .matches(/^[a-zA-Z\s]*$/, " title must be String"),
  body: Yup.string().required("please enter the text").min(1, "pleas enter body"),
});
const PostsList = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.postsData.posts);
  const [isEditing, setIsEditing] = useState(false);
  const [editPost, setEditPost] = useState({
    id: "",
    title: "",
    body: "",
  });

  // Component Did Mount
  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const handleAddPost = () => {
    dispatch(addPost(formik.values)).then(() => {
      formik.resetForm();
      toast.success("Post added successfully");
    });
  };

  const handleUpdateClick = (post) => {
    setEditPost({
      id: post.id,
      title: post.title,
      body: post.body,
    });
    setIsEditing(true);
  };

  const handleUpdate = (updatedPost) => {
    dispatch(updatePost(updatedPost)).then(() => {
      toast.success("Post updated successfully");
      setIsEditing(false);
      setEditPost({ id: "", title: "", body: "" });
    });
  };

  const handleDelete = (postId) => {
    dispatch(deletePost(postId)).then(() => {
      toast.success("Post deleted successfully");
    });
  };

  const formik = useFormik({
    initialValues: { title: "", body: "" },
    validationSchema,
    onSubmit: (values) => {
      handleAddPost();
    },
  });

  const navigate = useNavigate();
  const handleClick = (id) => {
    navigate(`/id/${id}`);
  };

  return (
    <>
      <div className="posts-container">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              {Array.isArray(posts) ? (
                posts.map((post) => (
                  <div
                    className="card post-item"
                    key={post.id}
                  >
                    <div className="card-body">
                      <div onClick={() => handleClick(post.id)} className="click-card ">
                        <h5>
                          {post.id} - {post.title}
                        </h5>
                        <p className="card-text">{post.body}</p>
                      </div>
                      <div className="postControlButtons">
                        <button
                          className="btn btn-primary"
                          onClick={() => handleUpdateClick(post)}
                        >
                          <FontAwesomeIcon icon={faEdit} /> Update
                        </button>
                        <button
                          className="btn btn-danger"
                          onClick={() => handleDelete(post.id)}
                        >
                          <FontAwesomeIcon icon={faTrash} /> Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p>No posts available</p>
              )}
            </div>

            <div className="col-lg-4">
              <div className="add-post-form">
                <form onSubmit={formik.handleSubmit}>
                  <input
                    type="text"
                    className="form-control mb-2"
                    placeholder="Title"
                    {...formik.getFieldProps("title")}
                  />
                  {formik.touched.title && formik.errors.title ? (
                    <div style={{ color: "red" }}>{formik.errors.title}</div>
                  ) : null}

                  <textarea
                    className="form-control mb-2"
                    placeholder="Body"
                    rows="4"
                    {...formik.getFieldProps("body")}
                  />
                  {formik.touched.body && formik.errors.body ? (
                    <div style={{ color: "red" }}>{formik.errors.body}</div>
                  ) : null}

                  <button className="btn btn-success" type="submit">
                    <FontAwesomeIcon icon={faPlus} /> Add Post
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for Update Post */}
      {isEditing && (
        <div
          className="modal fade show"
          id="updatePostModal"
          tabIndex="-1"
          aria-labelledby="updatePostModalLabel"
          aria-hidden="true"
          style={{ display: "block" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="updatePostModalLabel">
                  Edit Post
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={() => setIsEditing(false)}
                ></button>
              </div>
              <div className="modal-body">
                <input
                  type="text"
                  className="form-control mb-2"
                  value={editPost.title}
                  onChange={(e) => setEditPost({ ...editPost, title: e.target.value })}
                />
                <textarea
                  className="form-control mb-2"
                  rows="4"
                  value={editPost.body}
                  onChange={(e) => setEditPost({ ...editPost, body: e.target.value })}
                />
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                  onClick={() => setIsEditing(false)}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => handleUpdate(editPost)}
                >
                  Update Post
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <ToastContainer />
    </>
  );
};

export default PostsList;
