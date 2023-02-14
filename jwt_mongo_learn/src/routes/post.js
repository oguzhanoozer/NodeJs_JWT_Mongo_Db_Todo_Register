const express = require("express")
const {createPost,getPost,getPostDetail,getPostUpdate,deletePost,searchPost} = require("../controller/post.js")
const auth = require("../middleware/auth.js")

const router = express.Router()

router.get("/searchPost",searchPost)
router.get("/getPost",getPost)
router.post("/createPost",auth,createPost)
router.get("/getPostDetail/:id",getPostDetail)
router.patch("/getPostUpdate/:id",auth,getPostUpdate)
router.delete("/deletePost/:id",auth,deletePost)


module.exports = router