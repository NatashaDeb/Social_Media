
import './App.css'
import "bootstrap/dist/css/bootstrap.min.css";
import Header from './components/Header';
import Footer from './components/Footer';
import SideBar from './components/SideBar';
import CreatePost from './components/CreatePost';
import Post from './components/Post';

function App() {
 

  return (
    <>
    <div className='app-container'>
      <SideBar></SideBar>
      <div className='content'>
        <Header></Header> 
        <CreatePost></CreatePost>
        <Post></Post>
        <Footer></Footer>
      </div>
    </div>
    </>
  )
}

export default App
