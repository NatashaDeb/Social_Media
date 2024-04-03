import "bootstrap/dist/css/bootstrap.min.css";
import { useContext } from "react";
import { MdOutlinePlaylistRemove } from "react-icons/md";
import { PostList } from "../store/postList-store";

function Post({post}){
    const{deletePost} = useContext(PostList) //from PostList context I destructured deletePost method here

    return(
        <div className="card post-card" style = {{width: "30rem"}}>
            <div className="card-body">
            <span className="badge rounded-pill text-bg-dark user">{post.userID}</span>
                <h5 className="card-title">{post.title}
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                  onClick={()=> deletePost(post.id)}>
                <MdOutlinePlaylistRemove />
                    <span className="visually-hidden">Delete</span>
                </span>
                </h5>
                <p className="card-text">{post.body}</p>
                {post.tags.map((tag)=>(<span key={tag} className="badge text-bg-light">{`#${tag}`}</span>))}
                <div className="alert alert-info" role="alert">
                    {post.reactions} people have reacted on your post
                </div>
            </div>
        </div>
    )
}

export default Post;