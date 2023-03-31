import React, { useState, useEffect } from 'react';
import Styles from "./styles"
import { Paper, Typography, CircularProgress, Divider } from '@material-ui/core/';
import moment from 'moment';
import { useDispatch } from "react-redux";
import { useSelector } from 'react-redux';
import CommentSection from './commentSection';
import { useParams } from "react-router-dom";
import { getPost, getPostPerPage } from "../../states/actions/post-actions"
import DummySection from "./dummySection"
import { useNavigate } from "react-router-dom";

const Details = () => {
    const details = useSelector((state) => state.details)
    const post = useSelector((state) => state.posts)
    const { id } = useParams();
    const dispatch = useDispatch()
    const classes = Styles()
    const navigate = useNavigate();
    const recommendedPosts = post.posts.filter((element) => id !== element._id).slice(0, 3)

    useEffect(() => {
        const randomNumber = Math.floor(Math.random() * 3) + 1
        dispatch(getPostPerPage(post.currentPage || randomNumber))
    }, []);


    useEffect(() => {

        dispatch(getPost(id))

    }, [id]);

    const openPost = (id) => {
        navigate(`/posts/${id}`)
    }


    return (
        details.title === null ? <CircularProgress /> :
            (<Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
                <div className={classes.card}>
                    <div className={classes.section}>
                        <Typography variant="h3" component="h2">{details.title}</Typography>
                        <Typography gutterBottom variant="h6" color="textSecondary" component="h2">{details.tags[0].split(",").map((tag) => `#${tag} `)}</Typography>
                        <Typography gutterBottom variant="body1" component="p">{details.message}</Typography>
                        <Typography variant="h6">Created by: {details.creator}</Typography>
                        <Typography variant="body1">{moment(details.date).fromNow()}</Typography>
                        <Divider style={{ margin: '20px 0' }} />
                        <Typography variant="body1"><strong>Realtime Chat - coming soon!</strong></Typography>

                    </div>
                    <div className={classes.imageSection}>
                        <img className={classes.media} src={details.image || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt={details.title} />
                    </div>
                </div>

                {/* <CommentSection postDetails={details} /> */}

                <DummySection postDetails={details} />

                {!!recommendedPosts.length && (
                    <div className={classes.section}>
                        <Typography gutterBottom variant="h5">You might also like:</Typography>
                        <Divider />
                        <div className={classes.recommendedPosts}>
                            {recommendedPosts.map(({ title, creator, message, likes, image, _id }) => (
                                <div style={{ margin: '20px', cursor: 'pointer' }}
                                    onClick={() => openPost(_id)} 
                                    key={_id}>
                                    <Typography gutterBottom variant="h6">{title}</Typography>
                                    <Typography gutterBottom variant="subtitle2">{creator}</Typography>
                                    <Typography gutterBottom variant="subtitle2">{message.slice(0, 100)}...</Typography>
                                    <Typography gutterBottom variant="subtitle1">Likes: {likes.length}</Typography>
                                    <img src={image} width="200px" />
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </Paper>)
    );
}

export default Details;
