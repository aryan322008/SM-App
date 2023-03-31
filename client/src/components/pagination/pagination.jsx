import React from 'react';
import { Pagination, PaginationItem } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import useStyles from "./styles"
import {Link} from "react-router-dom"
import { useSelector } from 'react-redux';


const PaginationBox = ({page}) => {
  const post = useSelector((state) => state.posts)

    const classes = useStyles();

    return (
        <>
       {post.totalPages && <Pagination
        variant="outlined" 
        color="primary"
        classes={{ ul: classes.ul }}
        count={Math.ceil(Number(post.totalPages))}
        page={Number(post.currentPage)}
        renderItem={(item) => (
          <PaginationItem
            slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
            {...item}
            component={Link} 
            to={`/posts?page=${item.page}`} 
          />
        )}
      />}
      </>
    );
}

export default PaginationBox;
 