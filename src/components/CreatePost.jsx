import "bootstrap/dist/css/bootstrap.min.css"
import { useContext, useRef } from "react";
import {PostList} from "../store/postList-store";

function CreatePost (){

    const {addPost} = useContext(PostList);

    let userIDEle = useRef(); 
    let postTitleEle = useRef();
    let postBodyEle = useRef();
    let reactionsEle = useRef();
    let hashtagsEle = useRef();

    const handleSubmit = (event) =>{
        event.preventDefault(); //dont submit the form 
        const currUser = userIDEle.current.value;
        const currTitle = postTitleEle.current.value;
        const currBody = postBodyEle.current.value;
        const currReactions = reactionsEle.current.value;
        const currTags = hashtagsEle.current.value.split(' ');

        console.log(`${currUser}`);

        //making all the values blank once finished reading
        userIDEle.current.value = "";
        postTitleEle.current.value ="";
        postTitleEle.current.value ="";
        reactionsEle.current.value ="";
        hashtagsEle.current.value ="";


        {/*Add post to we are doing in Dummy server
           Just Take care enter only valid user ID which is there in server already
           i,e from 1-100
         */}
         console.log("Sending Entered post to server")

         fetch('https://dummyjson.com/posts/add', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title: currTitle,
                    body: currBody,
                    reactions: currReactions,
                    userId: currUser,
                    tags: currTags
                    /* other post data */
                })
                })
                .then(res => res.json())
                .then(post => addPost(post));

        
    };

    return(
        <form className="create-post" onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="userID" className="form-label">User ID</label>
                <input type="text"
                       ref={userIDEle}
                       className="form-control"
                       id="userId"
                       placeholder="Enter Your user ID"/>
                <div id="userIDHelp"
                     className="form-text">We'll never share your user ID info with anyone else.</div>
            </div>
            <div className="mb-3">
                <label htmlFor="postTitle" className="form-label" >Post Title</label>
                <input type="text" 
                       ref={postTitleEle}
                       className="form-control"
                       id="postTitle"
                       placeholder="How are you feeling today?"/>
            </div>
            <div className="mb-3">
                <label htmlFor="postBody" className="form-label" >Post Content</label>
                <textarea type="text"
                          ref={postBodyEle}
                          className="form-control"
                          id="postBody"
                          placeholder="Tell us more about it.."/>
            </div>
            <div className="mb-3">
                <label htmlFor="reactions" className="form-label" >Reactions</label>
                <input type="text" 
                       ref={reactionsEle}
                       className="form-control" 
                       id="reactions" 
                       placeholder="How many reactions you have Got?"/>
            </div>
            <div className="mb-3">
                <label htmlFor="hashtags" className="form-label" >Type Hashtags</label>
                <input type="text" 
                       ref={hashtagsEle}
                       className="form-control" 
                       id="hashtags" 
                       placeholder="Enter your Hashtags by putting space in between :)"/>
            </div>
           
            <button type="submit" className="btn btn-primary">Post</button>
        </form>
    )
}

export default CreatePost;