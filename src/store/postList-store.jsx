import { createContext, useReducer } from "react";

export const PostList = createContext(
     {//here just all the properties are declared initially
        postList: [],
        addPost: () =>{},
        addInitialPost: () =>{},
        deletePost: () =>{} 
    }   
);


const postListReducer = (currPostList, action) =>{ //reducer function

    console.log(currPostList);
    console.log(action);
    
    let newPostList = currPostList;

    if(action.type === "DELETE_POST"){
       //baapreh.. dont put {} after (post)=> (why that i dont know yet) 
        newPostList = currPostList.filter((post)=> post.id !== action.payload.postId);
    }
    else if(action.type === "ADD_POST"){
        newPostList = [action.payload, ...currPostList]
        console.log("postlist after adding")
        console.log(newPostList)
    }
    else if(action.type === "ADD_INITIAL_POSTS"){
        newPostList = action.payload.posts;
    }

    return newPostList;
}

//PostListProvider is a component which wraps children inside <PostList.Provider /> and renders them
const PostListProvider = ({children}) => { 


    const[postList, dispatchPostList] = useReducer(postListReducer,[]) ;
    //inital values assigned to postlist array is DEFAULT_POST_LIST 
    //intial postList is passed here which will be updated and dispatched depending on action assigned to postListReducer()

    const addInitialPost = (posts) =>{
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

    // const addPost = (userId, title, body, reactions, tags) =>{
    //    //console.log(`${userId} ${title} ${body} ${reactions} ${tags}`)
    //    dispatchPostList(
    //     {
    //         type: "ADD_POST",
    //         payload: {
    //                     id: Date.now(),
    //                     title: title,
    //                     body: body,
    //                     reactions: reactions,
    //                     userID: userId,
    //                     tags: tags
    //         }
    //     }
    //    )
    // }

    const addPost = (post) =>{ //getting object of entire post 
        console.log("Post recived at addPost")
       console.log(post)
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
            postList, addPost , addInitialPost ,deletePost
        }
        }>
            {children}
        </PostList.Provider>
    )
}

export default PostListProvider;