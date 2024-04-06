import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import CreatePost, { CreatePostAction } from './components/CreatePost.jsx';
import PostList from './components/PostList.jsx';

/* "/" Indicates it will load App component by default
    App is my base inside it we need to show the children CreatePost and PostList 
    / if path is / then <PostList/> should be visible and if path is createPost <CreatePost /> should be visible
    action expects an method/ promise which will be executed when in <CreatePost/> any submission of form will be called
*/
const router = createBrowserRouter([{path : "/", element: <App />, 
                                      children: [
                                        {path: "/", element:<PostList/>},
                                        {path: "/createPost", element: <CreatePost/>, action: CreatePostAction}
                                      ]
                                    },
                                  ]); 


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router = {router}></RouterProvider>
  </React.StrictMode>,
)
