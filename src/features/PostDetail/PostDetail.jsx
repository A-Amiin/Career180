import React from 'react';
import { useParams } from 'react-router-dom';
import { fetchPostById } from "../posts/postsSlice";
import { useDispatch, useSelector } from "react-redux";
import "./styles.css";
function PostDetail() {
    // Get post data from the location state
    // Access the post data passed via Link
    // Example: <Link to={`/posts/${post.id}`} state={{ post }}>View Post</Link>
    const { id } = useParams();
    const dispatch = useDispatch();
    React.useEffect(() => {
        dispatch(fetchPostById(id));
    }, [dispatch]);

    const post = useSelector((state) => state.postsData.posts);

    if (!post) {
        return <p>Post not found</p>;
    }

    return (
        <div className="container ay7aga">
            <div className="post-detail">
                <p><strong>ID:</strong> {post.id}</p>
                <h2>{post.title}</h2>
                <p>{post.body}</p>
            </div>
        </div>
    );
}

export default PostDetail;

