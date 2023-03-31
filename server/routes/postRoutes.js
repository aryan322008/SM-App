import {savePost,fetchPosts,deletePost,updatePost,likePost,getSearchedPosts, getDeatils,getPostPerPage, addComment } from "../controller/posts.js";
import { Router } from "express"
const router = Router()
import middleware from "../middleware/tokenParser.js"

router.post("/savePost",middleware, savePost)

router.get("/fetchPosts",fetchPosts)

router.delete("/deletePost/:id",middleware,deletePost)

router.patch("/updatePost/:id",middleware,updatePost)

router.post("/likePost/:id",middleware,likePost)

router.post(`/searchPosts`,getSearchedPosts)

router.post("/pagePost" , getPostPerPage)

router.post("/addComment" ,middleware, addComment)

router.post(`/:id`,getDeatils)


export default router;