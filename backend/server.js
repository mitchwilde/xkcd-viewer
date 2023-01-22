import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';

const PORT = 5001;
const app = express();

app.use(cors());

const fetchOptions = {
    method: 'GET'
}
// This function runs if the http://localhost:5000/getData endpoint
// is requested with a GET request
const corsOptions = {
    origin: "http://localhost:3000"
};

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
//"X-Cybozu-API-Token: YOUR_TOKEN" "https://mwilde.kintone.com/k/v1/record.json?app=1&id=1"
app.get('/getData', cors(corsOptions), async (req, res) => {
    const requestEndpoint1 = "https://xkcd.com/info.0.json";
    const response1 = await fetch(requestEndpoint1, fetchOptions);
    const jsonResponse1 = await response1.json();
    const comicNum = (getRandomInt(jsonResponse1.num-1)+1).toString();
    const requestEndpoint2 = "https://xkcd.com/"+comicNum+"/info.0.json";
    const response = await fetch(requestEndpoint2, fetchOptions);
    const jsonResponse2 = await response.json();
    res.json(jsonResponse2);
});

app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`);
});