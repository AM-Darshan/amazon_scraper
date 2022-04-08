const express = require('express')
const request = require('request-promise')

const app = express();
const PORT = process.env.PORT || 5000


// const baseUrl = `http://api.scraperapi.com?api_key=${apiKey}&autoparse=true`

const returnScraperApiUrl = (apiKey) => `http://api.scraperapi.com?api_key=${apiKey}&autoparse=true`;

app.use(express.json());

app.get("/",(req,res)=>{
    res.send('Amazon scraper API..')
})

//GET Product Details

app.get('/products/:productId', async(req,res)=>{
    const {productId} = req.params;
    const {apiKey} = req.query;
    try{
        const response = await request(`${returnScraperApiUrl(apiKey)}&url=https://www.amazon.com/dp/${productId}`)

        res.json(JSON.parse(response));
    }catch(error){
        res.json(error)
    }
})

//Products Reviews

app.get('/products/:productId/reviews', async(req,res)=>{
    const {productId} = req.params;
    const {apiKey} = req.query;

    try{
        const response = await request(`${returnScraperApiUrl(apiKey)}&url=https://www.amazon.com/products-reviwes/${productId}`)

        res.json(JSON.parse(response));
    }catch(error){
        res.json(error)
    }
})

//Products Offers

app.get('/products/:productId/offers', async (req, res) => {
    const {productId} = req.params;
    const {apiKey} = req.query;

    try {
        const response = await request(`${returnScraperApiUrl(apiKey)}&url=https://www.amazon.com/gp/offer-listing/${productId}`)

        res.json(JSON.parse(response));
    } catch (error) {
        res.json(error)
    }
})


// Product Search query

app.get('/search/:searchQuery', async(req,res)=>{
    const {searchQuery} = req.params;
    const {apiKey} = req.query;

    try{
        const response = await request(`${returnScraperApiUrl(apiKey)}&url=https://www.amazon.com/s?k=${searchQuery}`)

        res.json(JSON.parse(response));
    }catch(error){
        res.json(error)
    }
})
app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`)
});