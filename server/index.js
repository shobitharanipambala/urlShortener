import express, {response} from "express";
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

//   if (foundData) {
//     res.redirect(foundData.url);
//   } else {
//     res.status(404).send("Alias not found");
//   }
// });
app.get("/r/:alias", async (req, res) => {
  const { alias } = req.params;
  const foundData = await Url.findOne({ alias: alias });
  console.log(foundData)
  if (foundData) {
    res.redirect(foundData.url);
  } else {
    res.status(404).send("Alias not found");
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

  const urls = {};
  const alias = shortid.generate();
  urls[alias] = url;
  const data = {
    alias,
    url,
  };
  await Url.create(data);

    res.send(`http://localhost:3000/r/${alias}`);
});
app.get("/r/:alias", async (req, res) => {
  console.log(req.params)
  const { alias } = req.params;
  
  const foundData = await Url.find({alias});
  console.log(foundData.url)
  if (foundData) {
    res.redirect(foundData.url);
  } else {
    res.status(404).send("Alias not found");
  }
});


app.get("/", (req, res) => {
    res.send("welcome to urlshortner");
});

app.listen(3000, () => {
    console.log("listening on port 3000");
});
