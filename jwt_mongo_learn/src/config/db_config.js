const mongoose = require("mongoose")

const db = () => {
    mongoose.connect(process.env.MONGO_URI,{
        useNewUrlParser : true,
        useUnifiedTopology : true
    }).then(()=>{
         console.log("mongoDB connecting is succeed")
    }).catch((error)=>{
        //throw new Error(error.message)
        console.log("mongoDB connecting is not succeed: "+error)
    })
}


module.exports = db