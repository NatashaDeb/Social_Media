import { createContext, useReducer, useState, useEffect } from "react";

export const PostList = createContext(
     {//here just all the properties are declared initially
        postList: [],
        fetching: false,
        addPost: () =>{},
        deletePost: () =>{} 
    }   
);


      
const postListReducer = (currPostList, action) =>{ //reducer function

    // console.log(currPostList);
    // console.log(action);
    
    let newPostList = currPostList;

    if(action.type === "DELETE_POST"){
       //baapreh.. dont put {} after (post)=> (why that i dont know yet) 
        newPostList = currPostList.filter((post)=> post.id !== action.payload.postId);
    }
    else if(action.type === "ADD_POST"){
        newPostList = [action.payload, ...currPostList]
        // console.log("postlist after adding")
        // console.log(newPostList)
    }
    else if(action.type === "ADD_INITIAL_POSTS"){
        newPostList = action.payload.posts;
    }

    return newPostList;
}

//PostListProvider is a component which wraps children inside <PostList.Provider /> and renders them
const PostListProvider = ({children}) => { 

      {/*As soon as the promise needs time to be fullfilled there are No posts shoulnt come,
       instead we should get a loading symbol until we fetch the data from server */}
       const [fetching, setFetching] = useState(false); //here we are setting value of fetching false initially
       //i,e bydefault it won't show the spinner 
       //we must pass the state fetching to the children so that they can render accordingly

        {/*This should be called here since the list should be fetched from server only once not everytime postlist 
        gets printed.
        using useEffect we are trying to achive here dummy data as soon as the app is being painted for the first time
        and should'nt repaint entire dummy array again and again on any changes, therefore, the fetch function will run
        once the app starts newly and after it runs once
          1st argument is a function that will run when app gets paints for 1st time
          2nd argument is [] i,e there are NO Dependency Variables therefore the app will never be repainted again */}
          useEffect(() => {
            setFetching(true); //until promise is fullfilled fetching is set true
            // and should be set false again once the fetching is done  

            const controller = new AbortController; //for useEffect Hook cleanup
            const signal = controller.signal; //while fetching we need to pass it as 2nd argument in fetch function

            //console.log("fetch started")
            //console.log("PostList Component rendered")
            fetch('https://dummyjson.com/posts', {signal})
            .then(res => res.json())
            .then((data)=>{addInitialPost(data.posts)
                setFetching(false);
            });
           // console.log("fetch ended")

            return() =>{
                controller.abort(); //if call is done already there shouldnt be any affect in re-render of <PostList />
            }
            
        } , []); 

    const[postList, dispatchPostList] = useReducer(postListReducer,[]) ;
    //inital values assigned to postlist array is DEFAULT_POST_LIST 
    //intial postList is passed here which will be updated and dispatched depending on action assigned to postListReducer()

    const addInitialPost = (posts) =>{ //initial_post shouldnt be sent as contexts anywhere 
        //since initial post are being printed here itself so no need to pass to any children
        //console.log(`${userId} ${title} ${body} ${reactions} ${tags}`)
        dispatchPostList(
         {
             type: "ADD_INITIAL_POSTS",
             payload: {
                       posts
             }
         }
        )
     }

    const addPost = (post) =>{ //getting object of entire post 
       // console.log("Post recived at addPost")
       //console.log(post)
       dispatchPostList(
        {
            type: "ADD_POST",
            payload : post,
        }
       )
    }
    
    const deletePost = (postId) =>{
        //console.log(`delete post called for ${postId}`);
        dispatchPostList(
            {
                type: "DELETE_POST",
                payload: {
                    postId,
                },
            }
        );
    };


    return (
        <PostList.Provider value={ { //the object is passed in ContextProvider so that all children component can use them
            postList, fetching, addPost ,deletePost
        }
        }>
            {children}
        </PostList.Provider>
    )
}

export default PostListProvider;