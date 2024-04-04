import "bootstrap/dist/css/bootstrap.min.css";
import Post from "./Post";
import { useContext, useEffect, useState } from "react";
import {PostList as PostListData} from "../store/postList-store"
import EmptyMessage from "./EmptyMessage";
import Loading from "./Loading";

function PostList(){

    const {postList, addInitialPost} = useContext(PostListData)

    {/*As soon as the promise needs time to be fullfilled there aremt any post shoulnt come
       instead we should get a loading symbol until we fetch the data from server */}
    const [fetching, setFetching] = useState(false); //here we are setting value of fetching false initially
    //i,e bydefault it won't show the spinner 

    {/*using useEffect too we are trying to achive here dummy data as soon as the app is being painted for the first time
     and should'nt repaint entire dummy array again and again on any changes, therefore, the fetch function will run
     once the app starts newly and after it runs once
       1st argument is a function that will run when app gets paints for 1st time
       2nd argument is [] i,e there are NO Dependency Variables therefore the app will never be repainted again */}
    useEffect(() => {
                        setFetching(true); //until promise is fullfilled fetching is set true
                        // and should be set false again once the fetching is done  

                        const controller = new AbortController; //for useEffect Hook cleanup
                        const signal = controller.signal; //while fetching we need to pass it as 2nd argument in fetch function

                        console.log("fetch started")
                        console.log("PostList Component rendered")
                        fetch('https://dummyjson.com/posts', {signal})
                        .then(res => res.json())
                        .then((data)=>{addInitialPost(data.posts)
                            setFetching(false);
                            console.log("fetch returned");
                        });
                        console.log("fetch ended")

                        return() =>{
                            controller.abort(); //if call is done already there shouldnt be any affect in re-render of <PostList />
                        }
                        
                    } , []);
               
       
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