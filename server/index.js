const express = require('express');
const app = express();
const cors =require ('cors')
const shortid = require("shortid")
app.use(cors())
app.use(express.json());


const short = shortid.generate();
console.log(short)

app.listen(3000,()=>{
    console.log('listening on port 3000');
})