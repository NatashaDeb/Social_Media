import { createContext, useReducer } from "react";

export const PostList = createContext(
     {//here just all the properties are declared initially
        postList: [],
        addPost: () =>{},
        deletePost: () =>{} 
    }   
);


const postListReducer = (currPostList, action) =>{ //reducer function
    
    let newPostList = currPostList;

    if(action.type === "DELETE_POST"){
       //baapreh.. dont put {} after (post)=> (why that i dont know yet) 
        newPostList = currPostList.filter((post)=> post.id !== action.payload.postId);
    }
    else if(action.type === "ADD_POST"){
        newPostList = [action.payload, ...currPostList]
    }

    return newPostList;
}

//PostListProvider is a component which wraps children inside <PostList.Provider /> and renders them
const PostListProvider = ({children}) => { 

    const DEFAULT_POST_LIST =  [
                                    {
                                        id: 1,
                                        title:"Going to Mayapur",
                                        body:"Finally Able to go to Mayapur woww!! All Glories to Vaishnavs and Gurudev",
                                        reactions: 32,
                                        userID: "natasha_16",
                                        tags: ['Hare Krishna', 'vacation', 'enjoy']
                                    },

                                    {
                                        id: 2,
                                        title:"Studing for Placement",
                                        body:"Studing React right now need to revice the already done subjects like JAVA, CPP, C, Java Script",
                                        reactions: 64,
                                        userID: "jash_64",
                                        tags: ['Grinding', 'focus']
                                    }
                               ];

    const[postList, dispatchPostList] = useReducer(postListReducer, DEFAULT_POST_LIST) ;
    //inital values assigned to postlist array is DEFAULT_POST_LIST 
    //intial postList is passed here which will be updated and dispatched depending on action assigned to postListReducer()

    const addPost = (userId, title, body, reactions, tags) =>{
       //console.log(`${userId} ${title} ${body} ${reactions} ${tags}`)
       dispatchPostList(
        {
            type: "ADD_POST",
            payload: {
                        id: Date.now(),
                        title: title,
                        body: body,
                        reactions: reactions,
                        userID: userId,
                        tags: tags
            }
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
            postList, addPost , deletePost
        }
        }>
            {children}
        </PostList.Provider>
    )
}

export default PostListProvider;