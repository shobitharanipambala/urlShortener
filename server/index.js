import express from "express";
import {response} from "express";
const app = express();
import cors from "cors";
import shortid from "shortid";
import Url from "./model/url.js";
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.get("/mappings", async (req, res) => {
    const geturls = await Url.find();
    res.send(geturls);
});
app.get("/r/:alias", async (req, res) => {
    try {
        const {alias} = req.params;
        const foundData = await Url.findOne({alias: alias});
        if (foundData) {
            res.redirect(foundData.url);
        } else {
            res.status(404).send("URL not found");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred");
    }
});
app.post("/map", (req, res) => {
    try {
        const {alias, url} = req.body;
        console.log(req.body);
        const data = {
            alias,
            url
        };
        Url.create(data);
        res.send("added succesfully");
    } catch (err) {
        res.send("error in post api");
    }
});


app.post('/shorten', async (req, res) => {
    const {url} = req.body;
    const alias = shortid.generate();
    const shorternurl = `http://localhost:3000/r/${alias}`;

    // Check if the alias already exists in the database
    const existingUrl = await Url.findOne({alias: alias});
    if (existingUrl) { // Alias already exists, generate a new one
        return res.status(409).json({error: 'Alias already exists'});
    }


    const existingUrlByUrl = await Url.findOne({url: url});
    if (existingUrlByUrl) {

        return res.json({shortURL: existingUrlByUrl.shorternurl});
    }

    const data = {
        alias,
        url,
        shorternurl
    };
    await Url.create(data);
    res.json({shortURL: shorternurl});
});

app.get("/", (req, res) => {
    res.send("welcome to urlshortner");
});
app.listen(3000, () => {
    console.log("listening on port 3000");
});
