import "bootstrap/dist/css/bootstrap.min.css"
import { Form, redirect} from "react-router-dom";
import { PostList } from "../store/postList-store";
import { useContext } from "react";

function CreatePost (){
   // const {addPost} = useContext(PostList);
    return(
        <Form method="POST" className="create-post">
            <div className="mb-3">
                <label htmlFor="userID" className="form-label">User ID</label>
                <input type="text"
                       name="userId"    
                       className="form-control"
                       id="userId"
                       placeholder="Enter Your user ID"/>
                <div id="userIDHelp"
                     className="form-text">We'll never share your user ID info with anyone else.</div>
            </div>
            <div className="mb-3">
                <label htmlFor="postTitle" className="form-label" >Post Title</label>
                <input type="text" 
                       name=" title"
                       className="form-control"
                       id="postTitle"
                       placeholder="How are you feeling today?"/>
            </div>
            <div className="mb-3">
                <label htmlFor="postBody" className="form-label" >Post Content</label>
                <textarea type="text"
                          name="body"
                          className="form-control"
                          id="postBody"
                          placeholder="Tell us more about it.."/>
            </div>
            <div className="mb-3">
                <label htmlFor="reactions" className="form-label" >Reactions</label>
                <input type="text" 
                       name="reactions"
                       className="form-control" 
                       id="reactions" 
                       placeholder="How many reactions you have Got?"/>
            </div>
            <div className="mb-3">
                <label htmlFor="hashtags" className="form-label" >Type Hashtags</label>
                <input type="text" 
                       name="tags"
                       className="form-control" 
                       id="hashtags" 
                       placeholder="Enter your Hashtags by putting space in between :)"/>
            </div>
           
            <button type="submit" className="btn btn-primary">Post</button>
        </Form>
    )
}

export async function CreatePostAction (data){ 
    //Entire submission logic written here
    //action function gets a data object byDefault when method is "post"
    {/*Add post to we are doing in Dummy server
           Just Take care enter only valid user ID which is there in server already
           i,e from 1-100
         */}
        const formData = await data.request.formData(); //async method that requests data and returns from the form
        const postData = Object.fromEntries(formData); //All data we recieved inside postData
        postData.tags = postData.tags.split(" "); //to make tags string as an array
       //the formData is a complex object it has lots of methods from which we get out data. This is a shortcut / hack for it
       console.log(postData);
       

        fetch("https://dummyjson.com/posts/add", {
            method: "POST", 
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(postData), //directly passed in body
            })
            .then((res) => res.json())
            .then((post) =>console.log(post));
            

        return redirect("/"); //imediately after the form submission it will be redirected to Home
};



export default CreatePost;