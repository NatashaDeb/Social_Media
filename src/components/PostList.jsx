import "bootstrap/dist/css/bootstrap.min.css";
import Post from "./Post";
import { useContext, useEffect, useState } from "react";
import {PostList as PostListData} from "../store/postList-store"
import EmptyMessage from "./EmptyMessage";

function PostList(){

    const {postList, addInitialPost} = useContext(PostListData)

    //console.log(postList) //sucessfully the array is Stiched here
    {/*We have destructured the postList (array) in the objects of PostListData to be used here so that we 
       can create individual posts using the array which is being passed from the store using map method*/}

    {/*here we wish to have dummy data as soon as the app is being painted for the firs time and should'nt repaint 
       entire dummy array again and again on any changes, therefore, the fetch function will run once the app starts 
       newly and after it runs once the dataFetched variable will be toggled to true .. next time on any change 
       the UI wouldnt be repaeted painted with the posts array comming from dummy JSON */}
    // const [dataFetched, setDataFetched] =  useState(false); //initially the value of dataFetched is Kept false
    // if(!dataFetched){
    //     fetch('https://dummyjson.com/posts')
    //     .then(res => res.json())
    //     .then((data)=>addInitialPost(data.posts));
    //     setDataFetched(true);
    // }

    {/*using useEffect too we are trying to achive the same things like above we did
       1st argument is a function that will run when app gets paints for 1st time
       2nd argument is [] i,e there are NO Dependency Variables therefore the app will never be repainted again */}
    useEffect(() => fetchData, []);

    const fetchData = () =>{
        console.log("PostList Component rendered")
        fetch('https://dummyjson.com/posts')
        .then(res => res.json())
        .then((data)=>addInitialPost(data.posts));
    }                 
       
    return(
        <>
          {postList.length === 0 && <EmptyMessage />}
          {postList.map((post) => (<Post key={post.id}
                                    post ={post}/>))}{/*individual post is passed as prop inside Post component */}   
        </>
    )
}

export default PostList;