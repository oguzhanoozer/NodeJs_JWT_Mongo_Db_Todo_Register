const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")
const db = require("./src/config/db_config.js")
const auth = require("./src/routes/auth.js")
const post = require("./src/routes/post.js")

dotenv.config()

const app  = express()
app.use(cors())
app.use(express.json({limit : '30mb', extended: true}))
app.use(express.urlencoded({limit : '30mb', extended: true}))

app.use("/",auth)
app.use("/",post)


app.get("/",(req,res)=>{
        res.json({"message":"Hello JWT Learner!!"})
})

const PORT = process.env.PORT || 5009

db()

app.listen(PORT,()=>{
    console.log("server is running on port:5000")
})

module.exports = auth