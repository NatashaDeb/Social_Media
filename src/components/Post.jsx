import "bootstrap/dist/css/bootstrap.min.css";

function Post({post}){
    return(
        <div className="card post-card" style = {{width: "18rem"}}>
            <div className="card-body">
            <span class="badge rounded-pill text-bg-dark user">{post.userID}</span>
                <h5 className="card-title">{post.title}
                <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {post.reactions}
                    <span class="visually-hidden">Reactions</span>
                </span>
                </h5>
                <p className="card-text">{post.body}</p>
                {post.tags.map((tag)=>(<span class="badge text-bg-light">{`#${tag}`}</span>))}
            </div>
        </div>
    )
}

export default Post;