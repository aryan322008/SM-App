import mongoose from "mongoose";
import postModal from "../models/postModel.js";
import authModal from "../models/authModal.js";

const savePost = async (req, res) => {
    const postContent = req.body
    const id = req.user

    const user = await authModal.findOne({ _id: id })

    const newPost = await postModal.create(
        { ...postContent, author: user._id, creator: user.name }
    );

    res.send(newPost)

}

const fetchPosts = async (req, res) => {

    try {
        const posts = await postModal.find({})

        res.send(posts)
    } catch {

        res.status(404).json({ message: "it's bad" })

    }


}

const deletePost = async (req, res) => {
    const userId = req.user
    const id = req.params.id

    try {

        const post = await postModal.findById(id)

        if (post.author !== userId) {
            res.status(404).json({ message: "User doesn't match" })
        }

        const deletedPost = await postModal.findByIdAndDelete(id)

        res.send(deletedPost)
    } catch (error) {
        res.send(error)
    }
}
const updatePost = async (req, res) => {
    const userId = req.user
    const id = req.params.id
    const newPost = req.body


    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404).json({ message: "post doesn't exists" })
    }

    try {
        const post = await postModal.findById(id)

        if (post.author !== userId) {
            res.status(404).json({ message: "User doesn't match" })
        }

        const updatedPost = await postModal.findByIdAndUpdate(id, newPost, { new: true })

        res.send(updatedPost)

    } catch (error) {
        res.send(error)
    }
}

const likePost = async (req, res) => {
    const id = req.params.id

    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404).json({ message: "post doesn't exists" })
    }

    const post = await postModal.findById(id)

    const findPost = post.likes.find(element => element === req.user)

    if (findPost) {
        post.likes = post.likes.filter(element => element !== String(req.user))
    } else {
        post.likes.push(req.user)
    }


    try {
        const updatedPost = await postModal.findByIdAndUpdate(id, { ...post }, { new: true })

        res.send(updatedPost)

    } catch (error) {
        res.send(error)
    }

}

const getSearchedPosts = async (req, res) => {
    const { search, tags } = req.query

    const title = new RegExp(search, "i");

    const foundPosts = await postModal.find(
        {
            $or: [
                { title: title },
                { tags: { $in: [tags.toString().trim()] } }
            ]
        }
    )


    res.send([...foundPosts])


}


const getDeatils = async (req, res) => {

    const id = req.params.id

    const postDeatils = await postModal.findById(id)

    res.send(postDeatils)

}

const getPostPerPage = async (req, res) => {
    const { page } = req.query

    const postLimit = 4

    const skippedPosts = (Number(page) - 1) * postLimit

    try {

        const totalPages = (await postModal.count()) / 4

        const posts = await postModal.find({}).sort({ date: -1 }).skip(skippedPosts).limit(postLimit)

        res.send({ posts, totalPages, currentPage: page })


    } catch {

        res.status(404).json({ message: "cannot find your request" })

    }

}

const addComment = async (req, res) => {
    const { comment, id } = req.body

    const user = req.user

    const post = await postModal.findById(id)

    if (!post) {
        res.status(404).json({ message: "post doesn't exists" })
    }

    const userName =  await authModal.findById(user)

    try {

        post.comments.push({ user: userName.name , comment })

        const updatedPostWithComment = await postModal.findByIdAndUpdate(id, { ...post }, { new: true })

        res.send(updatedPostWithComment)

    } catch (error) {
        res.status(404).json({ message: "cannot add comment" })
    }

}


export { savePost, fetchPosts, deletePost, updatePost, likePost, getSearchedPosts, getDeatils, getPostPerPage, addComment }

