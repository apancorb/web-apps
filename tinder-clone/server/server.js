import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import Cards from "./models/dbCards.js";

// APP CONFIG
const app = express();
const port = process.env.PORT || 8001;
const connection_url = "mongodb+srv://admin:UTbFjeork9q257kj@cluster0.1xbgv.mongodb.net/tinderdb?retryWrites=true&w=majority";

// MIDDLEWARES
app.use(express.json());
app.use(cors());

// DB CONFIG
mongoose.connect(connection_url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

// API ENDPOINTS
app.get('/', (req, res) => res.status(200).send('hey!'));

app.post('/tinder/card', (req, res) => {
    const dbCard = req.body;
    console.log(dbCard)

    Cards.create(dbCard, (err, data) => {
        if (err) {
            res.status(500).send(err);
            // 500 => internal status error 
        } else {
            res.status(201).send(data);
            // 201 => succesfully created since this is a post call
        }
    });
});

app.get('/tinder/card', (req, res) => {
    Cards.find((err, data) => {
        if (err) {
            res.status(500).send(err);
            // 500 => internal status error 
        } else {
            res.status(200).send(data);
            // 200 => succesfully GET
        }
    });
});

// LISTENER
app.listen(port, () => console.log(`listening on localhost: ${port}`));