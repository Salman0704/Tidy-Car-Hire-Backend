const express= require('express')
const router= express.Router()

const {getAllBlog,getBlogByID, addComment}= require('../controllers/blog.controller')

router.get('/all', getAllBlog)
router.get('/id/:id', getBlogByID)
router.post('/addComment/:id', addComment)


module.exports= router
