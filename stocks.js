const axios = require("axios")

module.exports.getStockData = async (ticker) => {
    const { data } = await axios.get("https://finnhub.io/api/v1/quote", {
        params: {
            symbol: ticker,
            token: process.env.stockkey
        }
    })

    return data
}