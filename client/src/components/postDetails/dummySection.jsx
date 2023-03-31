import React, { useEffect, useState } from 'react';
import { Typography, TextField, Button, Container } from '@material-ui/core/';
import Styles from "./styles"
import { useDispatch } from "react-redux";
import { useSelector } from 'react-redux';
import { addComment } from "../../states/actions/post-actions"
import SendIcon from '@mui/icons-material/Send';


const DummySection = ({ postDetails }) => {
    const classes = Styles()
    const dispatch = useDispatch()
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState("");
    const details = useSelector((state) => state.details)
    const user = JSON.parse(localStorage.getItem("user"))

    const handleComment = (e) => {

        if (user) {
            console.log(user)
            const commentWithUser = `${user.newUser.name}: ${comment}`
            setComments([...comments, commentWithUser])


            dispatch(addComment(comment, postDetails._id))
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
    }

    return (

        <Container maxWidth="xl">

            <div className={classes.container}>
                <form className={classes.form} onSubmit={(e) => { handleSubmit(e) }}>

                    <TextField fullWidth minRows={4} variant="outlined" label="Comment" multiline value={comment} onChange={(e) => setComment(e.target.value)} />

                    <button type="submit" className={classes.btn} disabled={!comment.length} onClick={handleComment}><SendIcon /></button>
                </form>

                <div className="commentsContainer">

                    <h3>Comments : </h3>

                    <div className={classes.commentsMainContainer}>

                        {details.comments?.map((singleComment, index) => (
                            <div className={classes.singleComment}>
                                <span style={{ fontWeight: "bold" }}>{singleComment.user} : </span>
                                <span>{singleComment.comment}</span>
                            </div>
                        ))}

                    </div>

                </div>

            </div>
        </Container>
    );
}

export default DummySection;
