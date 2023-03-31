import React, {useState,useEffect} from 'react';
import Styles from "./style"
import { Grid,CircularProgress } from '@material-ui/core';
import {useDispatch} from "react-redux";
import Post from "./post/post";
import { useSelector } from 'react-redux';
import {getPosts} from "../../states/actions/post-actions"

const Posts = ({currentId,setcurrentId}) => {
 const post = useSelector((state) => state.posts.posts)
 const dispatch = useDispatch() 

 useEffect(() => {
   //  dispatch(getPosts())
 }, [currentId,dispatch]);

 useEffect(() => {
 }, [currentId]);

 const handleClick = (id) => {
    setcurrentId(id)
 }


    const classes = Styles()
    return (
        !post.length?<CircularProgress />:
        (  
        <Grid 
        className={classes.contaier}
        container
      //   alignitems='stretch'
        spacing={3}
        >
        {post.map((element,index)=>{
           return( <Grid key={index} item xs={12} sm={6} md={6} lg={3}>
            <Post post={element} func={handleClick}/>
            </Grid>)
        })}
        </Grid>
        )
   
    );
}

export default Posts;


// issues :- tags array