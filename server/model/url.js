import mongoose from "mongoose"
import dotenv from "dotenv"
import shortid from "shortid"

const env = dotenv.config()

const Mongo_url = "mongodb+srv://kaushik:kaush148@cluster0.habyrhy.mongodb.net/urlshortner"
mongoose.connect(Mongo_url).then(() => {
    console.log("connected to MOngoCloud")
}).catch(() => {
    console.log("error connecting to DB")
})


const urlSchema = new mongoose.Schema({alias: String, url: String, shorternurl: String});

const Url = mongoose.model('Url', urlSchema)

export default Url
