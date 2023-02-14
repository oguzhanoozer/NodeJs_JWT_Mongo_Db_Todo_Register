const express = require("express")
const {register,login} = require("../controller/auth")

const router = express.Router()

// post, update, get, delete
router.post("/register",register)
router.post("/login",login)

module.exports = router