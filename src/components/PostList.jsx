import "bootstrap/dist/css/bootstrap.min.css";
import Post from "./Post";
import { useContext, useEffect, useState } from "react";
import {PostList as PostListData} from "../store/postList-store"
import EmptyMessage from "./EmptyMessage";
import Loading from "./Loading";

function PostList(){

    const {postList, fetching} = useContext(PostListData)

    return(
        <>
          {fetching && <Loading />}
          {!fetching && postList.length === 0 && <EmptyMessage />}
          {!fetching && postList.map((post) => (<Post key={post.id}
                                    post ={post}/>))}{/*individual post is passed as prop inside Post component */}   
        </>
    )
}


export default PostList;