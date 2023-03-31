import React,{useEffect,useState, useRef } from 'react';
import { Typography, TextField, Button } from '@material-ui/core/';
import Styles from "./styles"
import { useDispatch } from "react-redux";
import { useSelector } from 'react-redux';
import {addComment} from "../../states/actions/post-actions"

const CommentSection = ({postDetails}) => {
    const classes = Styles()
    const dispatch = useDispatch()
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState("");
    const details = useSelector((state) => state.details)
    const user = JSON.parse(localStorage.getItem("user"))
    const commentsRef = useRef();

    const handleComment = (e) => {

      if(user){
        console.log(user)
        const commentWithUser = `${user.newUser.name}: ${comment}`
        setComments([...comments, commentWithUser])

        
        dispatch(addComment(comment, postDetails._id))

      }
      
      commentsRef.current.scrollIntoView({ behavior: 'smooth' });
}


    return (
        <div>
        <div className={classes.commentsOuterContainer}>
          <div className={classes.commentsInnerContainer}>
            <Typography gutterBottom variant="h6">Comments</Typography>
            {details.comments?.map((singleComment, index) => (
              <Typography key={index} gutterBottom variant="subtitle1">
                <strong>{singleComment.user}:</strong>
                {singleComment.comment}
              </Typography>
            ))}
            <div ref={commentsRef} /></div>
          <div style={{ width: '70%' }}>
            <Typography gutterBottom variant="h6">Write a comment</Typography>
            <TextField fullWidth minRows={4} variant="outlined" label="Comment" multiline value={comment} onChange={(e) => setComment(e.target.value)} />
            <br />
            <Button style={{ marginTop: '10px' }} fullWidth disabled={!comment.length} color="primary" variant="contained"
            onClick={handleComment}
            >
              Comment
            </Button>
          </div>
        </div>
      </div>
    );
}

export default CommentSection;
