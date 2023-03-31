import { Container, Grid,Grow} from "@material-ui/core";
import { Paper} from "@material-ui/core";
import React, {useState,useEffect} from 'react';
import Posts from "../posts/posts"
import Form from "../form/form"
import useStyles from "./styles"
import Pagination  from "../pagination/pagination";
import Search from "../search/search";
import { Navigate } from "react-router-dom";
import {useSearchParams} from "react-router-dom"
import {useDispatch} from "react-redux";
import {getPostPerPage} from "../../states/actions/post-actions"


const Home = () => {
    const [currentId, setcurrentId] = useState(null);
    const classes = useStyles();
    const [searchParams, setSearchParams] = useSearchParams();
    const dispatch = useDispatch() 
    const page = searchParams.get("page") || 1

    useEffect(() => {
      dispatch(getPostPerPage(page))
    }, [page]);


  return (
    <Grow in>
    <Container maxWidth="xl">
        <Grid container justifyContent='space-between' alignitem="strech" spacing={2}>

          <Grid item xs={12} sm={6} md={9}>
            <Posts currentId={currentId} setcurrentId={setcurrentId} />
          </Grid>

          <Grid item xs={12} sm={4} md={3}>

          <Search/>

            <Form currentId={currentId} setcurrentId={setcurrentId}  />

            <Paper elevation={6} className={classes.pagination}> 
            <Pagination page={page}/>
            </Paper>
          </Grid>

        </Grid>
      </Container>
      </Grow>
  )
}

export default Home


// Glitches ;-1) after deleteing at last page the page remains contanst and is not able to go back 
// 2) While creating i get the post more that four can be fixed with using openpost or getpost
// 3) Search glitch that i have to fill the both
// i can tackle this tomorrow after cm feature
