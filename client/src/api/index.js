import axios from 'axios';

const API = axios.create({ baseURL: "http://localhost:5000" })

API.interceptors.request.use((req) => {
   if (localStorage.getItem('user')) {
      req.headers.Authorization = `${JSON.parse(localStorage.getItem('user')).token}`;
   }
   return req;
})

const fetchPosts = async () => {

   try {
      const response = await API.get("/post/fetchPosts")
      return response
   } catch (error) {
      console.log(error)
   }
}
const createPost = async (post) => {

   try {
      const response = await API.post("/post/savePost", { ...post })
      return response
   } catch (error) {
      console.log(error)
   }
}
const deletePost = async (id) => {
   try {
      const response = await API.delete(`/post/deletePost/${id}`)

      return response
   } catch (error) {
      console.log(error)
   }
}

const updatePost = async (id, post) => {
   try {
      const response = await API.patch(`/post/updatePost/${id}`, post)

      return response
   } catch (error) {
      console.log(error)
   }
}

const register = async (formData) => {
   return await API.post(`/auth/register`, formData)
}

const login = async (formData) => {
   return await API.post(`/auth/login`, formData)
}

const likePost = async (id) => {
   return await API.post(`/post/likePost/${id}`)
}
const searchPosts = async (searchQuery) => {
   return await API.post(`/post/searchPosts?search=${searchQuery.search}&tags=${searchQuery.tags}`)
}

const getPost = async (id) => {
   return await API.post(`/post/${id}`)
} 

const getPostPerPage = async (id) => {
   return await API.post(`/post/pagePost?page=${id}`)
}

const addComment = async (comment, id) => {
   return await API.post(`/post/addComment`, {comment,id})
}

export { fetchPosts, createPost, deletePost, updatePost, register, login, likePost, searchPosts, getPost, getPostPerPage, addComment }


