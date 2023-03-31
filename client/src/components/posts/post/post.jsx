import Styles from "./style"
import React, { useState, useEffect } from 'react';
import { Card, CardActions, Button, Typography, CardContent, CardMedia } from "@material-ui/core";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import moment from "moment"
import { deletePost,likePost,getPost } from "../../../states/actions/post-actions"
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Post = ({ post, func }) => {
  const classes = Styles()
  const dispatch = useDispatch()
  const tags = post.tags[0].split(/[\s,]+/)
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const User = localStorage.getItem("user")
    if (User) {
      const user = JSON.parse(User)
      setUser(user.newUser)
    }
  }, []);

  const handleClick = () => {
    dispatch(getPost(post._id))
    
     navigate(`/posts/${post._id}`)
  }

  return (
    <Card className={classes.card}>

      <CardMedia className={classes.media} image={post.image || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} title={post.title} onClick={handleClick} />

      <div className={classes.overlay}>
        <Typography variant="h6">{post.creator}</Typography>
        <Typography variant="body2">{moment(post.date).fromNow()}</Typography>
      </div>


      {user.id && user.id === post.author ? <div className={classes.overlay2}>
        <Button style={{ color: 'white' }} size="small"
          onClick={() => func(post._id)}
        ><MoreHorizIcon fontSize="default" /></Button>
      </div> : null
      }

      <div className={classes.details}>
        <Typography variant="body2" color="textSecondary" component="h2">
          {tags.map((tag) => `#${tag} `)}
        </Typography>
      </div>

      <Typography className={classes.title} gutterBottom variant="h5" component="h2">{post.title}</Typography>

      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
        {post.message.slice(0,100)}...</Typography>
      </CardContent>

      <CardActions className={classes.cardActions}>
        <Button size="small" color="primary"
                onClick={() => dispatch(likePost(post._id))}
        ><ThumbUpIcon fontSize="small" />{post.likes.length} </Button>

        {
          user.id && user.id === post.author ? (
            <Button size="small" color="primary"
              onClick={() => dispatch(deletePost(post._id))}
            ><DeleteIcon fontSize="small" /> Delete</Button>):null
         }

        </CardActions>
      
    </Card>
  );
}

export default Post;

