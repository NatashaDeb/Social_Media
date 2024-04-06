
import './App.css'
import "bootstrap/dist/css/bootstrap.min.css";
import Header from './components/Header';
import Footer from './components/Footer';
import SideBar from './components/SideBar';
import CreatePost from './components/CreatePost';
import PostList from './components/PostList';
import { useState } from 'react';
import PostListProvider from './store/postList-store';
import { Outlet } from 'react-router-dom';


function App() {
 
  return (
    <>
    <PostListProvider>
    <div className='app-container'>
      <SideBar></SideBar>
      <div className='content'>
        <Header></Header> 
       {/*{selectedTab == 'Home'? <PostList></PostList>: <CreatePost></CreatePost>}*/}
       <Outlet></Outlet>
        <Footer></Footer>
      </div>
    </div>
    </PostListProvider>
    </>
  )
}

export default App
