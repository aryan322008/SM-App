import * as api from "../../api/index.js";

const getPosts = () => async (dispatch) => {
    try {

    const {data} = await api.fetchPosts()
    dispatch({type: "FETCH", payload: data})
        
    } catch (error) {
        console.error(error)
    } 
}
const createPost =  (post) => async (dispatch) => {

    const {data} = await api.createPost(post)

    console.log(data)

    const actions = {type: "CREATE", payload: data}
    
    dispatch(actions)
}

const deletePost = (id) => async (dispatch) => {
    const {data} = await api.deletePost(id)

    const actions = {type: "DELETE", payload: data}
    
    dispatch(actions)
}
const updatePost = (id,post) => async(dispatch) =>{
    const {data} = await api.updatePost(id,post)

    const actions = {type: "UPDATE", payload: data}
    
    dispatch(actions)
} 


const likePost = (id) => async(dispatch) => {
    const {data} = await api.likePost(id)

    
    const actions = {type: "UPDATE", payload: data}
    
    dispatch(actions)
}

const postSearch =  (searchQuery) => async (dispatch) => {
    const {data} = await api.searchPosts(searchQuery)

    const actions = {type: "SEARCHED_POSTS", payload: data}

    dispatch(actions)
}
const getPost = (id) => async (dispatch) => {
    const {data} = await api.getPost(id) 

    const action = {type: "GET", payload: data}

    dispatch(action)
}

const getPostPerPage = (page) => async (dispatch) =>{
    const {data} = await api.getPostPerPage(page)

    const action = {type: "GET_PPP", payload: data}

    dispatch(action)

}

const addComment = (comment, id) => async (dispatch) => {

    const {data} = await api.addComment(comment, id)

    const action = {type: "ADD_COMMENT", payload: data}

    console.log(data)

    dispatch(action)
}


export {getPosts, createPost,deletePost,updatePost, likePost, postSearch, getPost,getPostPerPage, addComment}
