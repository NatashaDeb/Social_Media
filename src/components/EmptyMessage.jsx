const EmptyMessage = ({onGetPostClick})=>{
    return(
        <center className="emptyMessage"> 
            <h1>There are NO Posts</h1>
            <button type="button" 
                    className="btn btn-info"
                    onClick={onGetPostClick}>
            Get Post from Server</button>
        </center>
    )
}

export default EmptyMessage;