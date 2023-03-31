import React, { useEffect, useState } from 'react';
import Styles from "./style"
import { Paper, Button, Typography } from "@material-ui/core";
import FileBase from 'react-file-base64';
import { createPost, updatePost } from "../../states/actions/post-actions"
import { useDispatch } from "react-redux";
import { useSelector } from 'react-redux';
import { TextField } from "@material-ui/core";

const Form = ({ currentId, setcurrentId }) => {
    const post = useSelector((state) => state.posts)
    const classes = Styles()
    const [postData, setPostData] = useState(
        {title: "", message: "", tags: "", image: ""}
        );
    const [display, setDisplay] = useState(false);

    const dispatch = useDispatch()

    useEffect(() => {
        if (localStorage.getItem("user")) {
            setDisplay(true)
        } else {
            setDisplay(false)
        }
    }, [display]);

    useEffect(() => {
        if (currentId) {
            console.log("inside check")
            const updatindPost = post.find((element, index) => {
                return element._id === currentId
            })
            setPostData({ ...updatindPost })
        }
    }, [currentId]);

    const handleChange = (event) => {
        const { name, value } = event.target
        setPostData({ ...postData, [name]: value })
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        if (currentId) {
            dispatch(updatePost(currentId, postData)).then((response) => {
                console.log("response", response)
            })
        } else {
            dispatch(createPost(postData)).then((response) => {
                console.log("response", response)
            })
        }

        clear()

    }
    const handleDone = (base64) => {
        setPostData({ ...postData, image: base64 })
    }

    const clear = () => {
        setcurrentId(null)
        setPostData({
            author: "", title: "", message: "", tags: "", image: ""
        })
    }
    return (
        display ? (<Paper className={classes.paper}>
            <form
                autoComplete="off"
                noValidate
                className={`${classes.form} ${classes.root}`}
                onSubmit={(event) => handleSubmit(event)}
            >
                <Typography variant="h6" >{currentId ? "Editing" : "Creating"} a Memory</Typography>
                <TextField
                    name="title"
                    variant="outlined"
                    label="Title"
                    fullWidth
                    value={postData.title}
                    onChange={(e) => handleChange(e)}
                >
                </TextField> 
                 <TextField
                    name="message"
                    variant="outlined"
                    label="Message"
                    fullWidth
                    value={postData.message}
                    onChange={(e) => handleChange(e)}
                >
                </TextField> 
                 <TextField
                    name="tags"
                    variant="outlined"
                    label="Tags"
                    fullWidth
                    value={postData.tags}
                    onChange={(e) => handleChange(e)}
                >
                </TextField>

                <div className={classes.fileInput}>

                    <FileBase
                        type="file"
                        mutiple={false}
                        onDone={({ base64 }) => { handleDone(base64) }}
                    />

                </div>

                <Button
                    style={{ marginTop: "10px" }}
                    variant="contained"
                    color="primary"
                    fullWidth
                    size="large"
                    type="submit"
                >Submit</Button>

                <Button
                    style={{ marginTop: "10px" }}
                    variant="contained"
                    color="secondary"
                    size="small"
                    fullWidth
                    onClick={() => { clear() }}
                >clear</Button>
            </form>
        </Paper>) :
            <Paper className={classes.paper}>
                <Typography variant="h6" >Sign up to create a memory</Typography>
            </Paper>
    );
}

export default Form;

