import "bootstrap/dist/css/bootstrap.min.css";
import Post from "./Post";
import { useContext } from "react";
import {PostList as PostListData} from "../store/postList-store"
import EmptyMessage from "./EmptyMessage";

function PostList(){
    const {postList, addInitialPost} = useContext(PostListData) 
    //console.log(postList) //sucessfully the array is Stiched here
    {/*We have destructured the postList (array) in the objects of PostListData to be used here so that we 
       can create individual posts using the array which is being passed from the store using map method*/}

       const handleGetPostClicked =() =>{
            //console.log("Get Post Click clicked")
            fetch('https://dummyjson.com/posts')
            .then(res => res.json())
            .then((data)=>addInitialPost(data.posts));
       }

    return(
        <>
          {postList.length === 0 && <EmptyMessage onGetPostClick={handleGetPostClicked}></EmptyMessage>}
          {postList.map((post) => (<Post key={post.id}
                                    post ={post}/>))}{/*individual post is passed as prop inside Post component */}   
        </>
    )
}

export default PostList;