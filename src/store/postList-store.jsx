import { createContext, useReducer } from "react";


const PostList = createContext(
     {//here just all the properties are declared initially
        postList: [],
        addPost: () =>{},
        deletePost: () =>{} 
    }   
);


const postListReducer = (currPostList, action) =>{ //reducer function
    return currPostList;
}

//PostListProvider is a component which wraps children inside <PostList.Provider /> and renders them
const PostListProvider = ({children}) => { 

    const DEFAULT_POST_LIST =  [
                                    {
                                        id:"1",
                                        title:"Going to Mayapur",
                                        body:"Finally Able to go to Mayapur woww!! All Glories to Vaishnavs and Gurudev",
                                        reactions: 32,
                                        userID: "natasha_16",
                                        tags: ['Hare Krishna', 'vacation', 'enjoy']
                                    },

                                    {
                                        id:"2",
                                        title:"Studing for Placement",
                                        body:"Studing React right now need to revice the already done subjects like JAVA, CPP, C, Java Script",
                                        reactions: 64,
                                        userID: "jash_64",
                                        tags: ['Grinding', 'focus']
                                    }
                               ]

    const[postList, dispatchPostList] = useReducer(postListReducer, DEFAULT_POST_LIST)

    const addPost = () =>{

    }
    
    const deletePost = () =>{
    
    }

    return (
        <PostList.Provider value={ { //the object is passed in ContextProvider so that all children component can use them
            postList: [], addPost , deletePost
        }
        }>
            {children}
        </PostList.Provider>
    )
}

export default PostListProvider;